import { useState, useEffect } from "react";
import { Recipe, Ingredient, RecipeIngredient } from "../lib/supabase/types";
import { supabase } from "../lib/supabase/supabaseClient";
import {
  fetchIngredients,
  addNewIngredient,
  saveRecipeIngredients,
} from "../lib/ingredientUtils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema, RecipeFormData } from "../lib/validation";

const CreateRecipe = () => {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipeIngredients, setRecipeIngredients] = useState<
    RecipeIngredient[]
  >([]);
  const [newIngredientMode, setNewIngredientMode] = useState<boolean>(false);
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [ingredientQuantity, setIngredientQuantity] = useState<string>("");
  const [newIngredientName, setNewIngredientName] = useState<string>("");
  const [newIngredientUnit, setNewIngredientUnit] = useState<
    "" | "g" | "ml" | "Stück" | "TL" | "EL" | "Prise"
  >("");
  const [newIngredientInfo, setNewIngredientInfo] = useState<string>("");
  const [ingredientError, setIngredientError] = useState<string>("");

  useEffect(() => {
    const loadIngredients = async () => {
      const ingredientsData = await fetchIngredients();
      setIngredients(ingredientsData);
    };

    loadIngredients();
  }, []);

  const handleAddNewIngredient = async () => {
    try {
      setIngredientError("");
      const newIngredientData = await addNewIngredient(
        newIngredientName,
        newIngredientUnit,
        newIngredientInfo
      );

      if (newIngredientData) {
        setIngredients((prev) => [...prev, newIngredientData]);

        setNewIngredientName("");
        setNewIngredientUnit("");
        setNewIngredientInfo("");
        setNewIngredientMode(false);

        setSelectedIngredient(newIngredientData.id);
      }
    } catch (err) {
      setIngredientError(
        err instanceof Error
          ? err.message
          : "Ein unbekannter Fehler ist aufgetreten"
      );
    }
  };

  const addIngredientToRecipe = () => {
    try {
      setIngredientError("");

      const quantity = parseFloat(ingredientQuantity);
      if (isNaN(quantity) || quantity <= 0) {
        setIngredientError("Bitte gib eine gültige Menge ein");
        return;
      }

      const ingredient = ingredients.find(
        (ing) => ing.id === selectedIngredient
      );
      if (!ingredient) {
        setIngredientError("Zutat nicht gefunden");
        return;
      }

      const existingIndex = recipeIngredients.findIndex(
        (item) => item.ingredient_id === selectedIngredient
      );

      if (existingIndex !== -1) {
        const updatedIngredients = [...recipeIngredients];
        updatedIngredients[existingIndex].quantity = quantity;
        setRecipeIngredients(updatedIngredients);
      } else {
        const newRecipeIngredient: RecipeIngredient = {
          ingredient_id: selectedIngredient,
          quantity,
          ingredient: ingredient,
        };

        setRecipeIngredients([...recipeIngredients, newRecipeIngredient]);
      }

      setSelectedIngredient("");
      setIngredientQuantity("");
    } catch (err) {
      console.error("Fehler beim Hinzufügen der Zutat:", err);
      setIngredientError(
        err instanceof Error
          ? err.message
          : "Ein unbekannter Fehler ist aufgetreten"
      );
    }
  };

  const removeIngredientFromRecipe = (index: number) => {
    setRecipeIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      description: "",
      instructions: "",
      servings: "",
      category_id: "",
      rating: "",
    },
  });

  const watchRating = watch("rating");

  const onSubmit = async (data: RecipeFormData) => {
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const instructionsArr = data.instructions.split(/(?<=[.!?])\s+/);

      const processedInstructions = instructionsArr
        .filter((sentence) => sentence.trim() !== "")
        .join(";");

      const newRecipe: Pick<
        Recipe,
        | "category_id"
        | "description"
        | "imageUrl"
        | "instructions"
        | "name"
        | "rating"
        | "servings"
      > = {
        name: data.name,
        description: data.description,
        servings: Number(data.servings),
        instructions: processedInstructions,
        category_id: data.category_id,
        imageUrl: imageUrl,
        rating: data.rating ? Number(data.rating) : 0,
      };

      const { data: recipeData, error: responseError } = await supabase
        .from("recipes")
        .insert(newRecipe)
        .select();

      if (responseError) {
        throw new Error(responseError.message);
      }

      if (recipeData && recipeData.length > 0) {
        const recipeId = recipeData[0].id;

        if (recipeIngredients.length > 0) {
          await saveRecipeIngredients(recipeId, recipeIngredients);
        }

        setSuccess("Rezept erfolgreich erstellt! ");

        reset();
        setImageUrl(null);
        setImageFileName(null);
        setUploadSuccess("");
        setRecipeIngredients([]);
      }
    } catch (err) {
      console.error("Fehler beim Erstellen des Rezepts:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Ein unbekannter Fehler ist aufgetreten"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    setIsUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      if (imageFileName) {
        const { error: deleteError } = await supabase.storage
          .from("photos")
          .remove([`recipe-images/${imageFileName}`]);

        if (deleteError) {
          console.warn(
            "Fehler beim Löschen des vorherigen Bildes:",
            deleteError
          );
        }
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExt}`;
      const filePath = `recipe-images/${fileName}`;

      console.log("Versuche Bild hochzuladen nach:", filePath);
      console.log("Dateiinformationen:", {
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024).toFixed(2)} KB`,
      });

      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Supabase Upload Fehler:", JSON.stringify(uploadError));
        throw new Error(`Upload fehlgeschlagen: ${uploadError.message}`);
      }

      console.log("Hochladen erfolgreich, hole URL...");

      const { data } = supabase.storage.from("photos").getPublicUrl(filePath);

      if (!data) {
        throw new Error("Konnte keine öffentliche URL erhalten");
      }

      console.log("URL erhalten:", data.publicUrl);
      setImageUrl(data.publicUrl);
      setImageFileName(fileName);
      setUploadSuccess("Bild erfolgreich hochgeladen!");
    } catch (err) {
      console.error("Fehler beim Hochladen des Bildes:", err);
      let errorMessage = "Ein unbekannter Fehler ist aufgetreten";

      if (err instanceof Error) {
        errorMessage = err.message;
        console.error("Fehlerdetails:", {
          name: err.name,
          message: err.message,
          stack: err.stack,
        });
      } else if (err && typeof err === "object") {
        console.error("Objekt Fehler:", JSON.stringify(err, null, 2));
        if ("message" in err) {
          errorMessage = String(err.message);
        }
      }

      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!imageFileName) {
      return;
    }

    setIsUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const { error: deleteError } = await supabase.storage
        .from("photos")
        .remove([`recipe-images/${imageFileName}`]);

      if (deleteError) {
        console.error("Fehler beim Löschen des Bildes:", deleteError);
        throw new Error(`Löschen fehlgeschlagen: ${deleteError.message}`);
      }

      setImageUrl(null);
      setImageFileName(null);
      setUploadSuccess("Bild erfolgreich gelöscht!");
    } catch (err) {
      console.error("Fehler beim Löschen des Bildes:", err);
      let errorMessage = "Ein unbekannter Fehler ist aufgetreten";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (err && typeof err === "object" && "message" in err) {
        errorMessage = String(err.message);
      }

      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <h1 className="headline-1  mb-8">Neues Rezept erstellen</h1>

        {error && (
          <div className="alert alert-error shadow-lg mb-4 w-full max-w-2xl">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="alert alert-success shadow-lg mb-4 w-full max-w-2xl">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{success}</span>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl space-y-6"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Rezeptname*</span>
            </label>
            <input
              type="text"
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
              {...register("name")}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.name.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Beschreibung*</span>
            </label>
            <textarea
              className={`textarea textarea-bordered h-24 w-full ${
                errors.description ? "textarea-error" : ""
              }`}
              {...register("description")}
            ></textarea>
            {errors.description && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.description.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Zubereitung*</span>
            </label>
            <textarea
              className={`textarea textarea-bordered h-36 w-full ${
                errors.instructions ? "textarea-error" : ""
              }`}
              {...register("instructions")}
              placeholder="Schritte durch Punkte trennen"
            ></textarea>
            {errors.instructions && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.instructions.message}
                </span>
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Portionen*</span>
              </label>
              <input
                type="number"
                className={`input input-bordered w-full ${
                  errors.servings ? "input-error" : ""
                }`}
                {...register("servings")}
                min="1"
              />
              {errors.servings && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.servings.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Kategorie*</span>
              </label>
              <select
                className={`select select-bordered w-full ${
                  errors.category_id ? "select-error" : ""
                }`}
                {...register("category_id")}
                defaultValue=""
              >
                <option value="" disabled>
                  Kategorie wählen
                </option>
                <option value="79d8ece1-d8fa-40e2-9038-8633ea126359">
                  Vorspeise
                </option>
                <option value="87d1c2b3-925a-424a-9f68-a4f961aa1eba">
                  Hauptgericht
                </option>
                <option value="52c74be3-39fc-4cae-a1a8-48bac18feead">
                  Dessert
                </option>
                <option value="1ce7b612-7997-499a-a40c-87291e0ad398">
                  Backen
                </option>
                <option value="f23e2ed9-a2c7-42e5-a2bf-c91ecac13eb5">
                  Beilage
                </option>
                <option value="8cf5aa79-2264-4e22-bd26-14e2eb72d03d">
                  Frühstück
                </option>
                <option value="eaa24805-79d5-4ac8-bc62-c6724023eaa1">
                  Getränk
                </option>
                <option value="ff51694e-1fc4-4e5a-968e-90f4f1441789">
                  Snack
                </option>
                <option value="db9e1c61-3107-4f1d-b10a-9085c7a44d6d">
                  Salat
                </option>
                <option value="9f39c9d9-1176-481e-a79f-b241e1cc8398">
                  Suppe
                </option>
                <option value="71df8d36-e9df-4316-8de8-9e4b7a006ea6">
                  Sauce
                </option>
              </select>
              {errors.category_id && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.category_id.message}
                  </span>
                </label>
              )}
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Bewertung</span>
            </label>
            <div className="rating rating-lg">
              {[1, 2, 3, 4, 5].map((value) => (
                <input
                  key={value}
                  type="radio"
                  className={`mask mask-star-2 ${
                    value <= 3 ? "bg-orange-400" : "bg-orange-400"
                  }`}
                  value={value}
                  {...register("rating")}
                  checked={watchRating === value.toString()}
                />
              ))}
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Foto hochladen</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            {isUploading && (
              <div className="mt-2">
                <span className="loading loading-spinner loading-md mr-2"></span>
                <span>Wird hochgeladen...</span>
              </div>
            )}
            {uploadSuccess && (
              <div className="text-success mt-2">{uploadSuccess}</div>
            )}
            {uploadError && (
              <div className="text-error mt-2">{uploadError}</div>
            )}
            {imageUrl && (
              <div className="mt-2">
                <img
                  src={imageUrl}
                  alt="Vorschau"
                  className="rounded-lg max-h-60 object-contain"
                />
                <button
                  type="button"
                  className="btn btn-error btn-sm mt-2"
                  onClick={handleDeleteImage}
                  disabled={isUploading}
                >
                  Bild löschen
                </button>
              </div>
            )}
          </div>

          {/* Ingredients Section */}
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title">Zutaten</h2>

              {/* Ingredient selection form */}
              <div
                className={`grid ${
                  newIngredientMode
                    ? "grid-cols-1"
                    : "grid-cols-1 md:grid-cols-3"
                } gap-3 mb-4`}
              >
                {!newIngredientMode ? (
                  <>
                    <div className="form-control">
                      <select
                        className="select select-bordered w-full"
                        value={selectedIngredient}
                        onChange={(e) => setSelectedIngredient(e.target.value)}
                        disabled={ingredients.length === 0}
                      >
                        <option value="">Zutat auswählen</option>
                        {ingredients.map((ingredient) => (
                          <option key={ingredient.id} value={ingredient.id}>
                            {ingredient.name} ({ingredient.unit})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control">
                      <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="Menge"
                        value={ingredientQuantity}
                        onChange={(e) => setIngredientQuantity(e.target.value)}
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div className="form-control flex flex-row gap-2">
                      <button
                        type="button"
                        className="btn btn-primary flex-1"
                        onClick={addIngredientToRecipe}
                        disabled={!selectedIngredient || !ingredientQuantity}
                      >
                        Hinzufügen
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary flex-1"
                        onClick={() => setNewIngredientMode(true)}
                      >
                        Neue Zutat
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="form-control">
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          placeholder="Name der Zutat"
                          value={newIngredientName}
                          onChange={(e) => setNewIngredientName(e.target.value)}
                        />
                      </div>
                      <div className="form-control">
                        <select
                          className="select select-bordered w-full"
                          value={newIngredientUnit}
                          onChange={(e) =>
                            setNewIngredientUnit(
                              e.target.value as
                                | ""
                                | "g"
                                | "ml"
                                | "Stück"
                                | "TL"
                                | "EL"
                                | "Prise"
                            )
                          }
                        >
                          <option value="">Einheit</option>
                          <option value="g">Gramm (g)</option>
                          <option value="ml">Milliliter (ml)</option>
                          <option value="Stück">Stück</option>
                          <option value="TL">Teelöffel (TL)</option>
                          <option value="EL">Esslöffel (EL)</option>
                          <option value="Prise">Prise</option>
                        </select>
                      </div>
                      <div className="form-control md:col-span-2">
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          placeholder="Zusätzliche Informationen (optional)"
                          value={newIngredientInfo}
                          onChange={(e) => setNewIngredientInfo(e.target.value)}
                        />
                      </div>
                      <div className="form-control md:col-span-2 flex flex-row gap-2">
                        <button
                          type="button"
                          className="btn btn-primary flex-1"
                          onClick={handleAddNewIngredient}
                        >
                          Speichern
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary flex-1"
                          onClick={() => setNewIngredientMode(false)}
                        >
                          Abbrechen
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {ingredientError && (
                <div className="alert alert-error">{ingredientError}</div>
              )}

              {/* Ingredient table */}
              {recipeIngredients.length > 0 && (
                <div className="overflow-x-auto mt-4">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th className="hidden md:table-cell">Zutat</th>
                        <th className="hidden md:table-cell">Menge</th>
                        <th className="hidden md:table-cell">Einheit</th>
                        <th className="hidden md:table-cell">Aktion</th>
                        {/* Mobile view combined column */}
                        <th className="md:hidden">Zutat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipeIngredients.map((item, index) => (
                        <tr key={index}>
                          {/* Desktop view */}
                          <td className="hidden md:table-cell">
                            {item.ingredient?.name}
                          </td>
                          <td className="hidden md:table-cell">
                            {item.quantity}
                          </td>
                          <td className="hidden md:table-cell">
                            {item.ingredient?.unit}
                          </td>
                          <td className="hidden md:table-cell">
                            <button
                              type="button"
                              className="btn btn-error btn-sm"
                              onClick={() => removeIngredientFromRecipe(index)}
                            >
                              Entfernen
                            </button>
                          </td>

                          {/* Mobile view - combined info */}
                          <td className="md:hidden">
                            <div className="flex flex-col">
                              <span className="font-bold">
                                {item.ingredient?.name}
                              </span>
                              <span>
                                {item.quantity} {item.ingredient?.unit}
                              </span>
                              <button
                                type="button"
                                className="btn btn-error btn-xs mt-1 self-start"
                                onClick={() =>
                                  removeIngredientFromRecipe(index)
                                }
                              >
                                Entfernen
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="form-control w-full mt-4">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Wird gespeichert...
                </>
              ) : (
                "Rezept speichern"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
