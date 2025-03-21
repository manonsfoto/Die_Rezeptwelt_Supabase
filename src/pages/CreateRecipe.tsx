import { useState } from "react";
import { Recipe } from "../lib/supabase/types";
import { supabase } from "../lib/supabase/supabaseClient";
import { useAuthStore } from "../store/authStore";
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

  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
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
      const instructionsArr = data.instructions.split(/([.!?])\s*/);
      const processedInstructions = instructionsArr
        .map((sentence, index) => {
          if (index % 2 === 0 && sentence.trim() !== "") {
            return sentence.trim() + ";";
          }
          return sentence;
        })
        .join(" ");

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

      const { error: responseError } = await supabase
        .from("recipes")
        .insert(newRecipe)
        .select();

      if (responseError) {
        throw new Error(responseError.message);
      }

      setSuccess("Rezept erfolgreich erstellt! ");
      reset();
      setImageUrl(null);
      setImageFileName(null);
      setUploadSuccess("");
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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || !event.target.files[0] || !user) {
      return;
    }

    setIsUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const imageFile = event.target.files[0];
      const fileName = `${user.id}_${imageFile.name}`;

      if (imageFileName) {
        await supabase.storage.from("photos").remove([imageFileName]);
      }

      const { data, error } = await supabase.storage
        .from("photos")
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw new Error(error.message);
      }

      setImageFileName(fileName);
      setUploadSuccess(`"${imageFile.name}" erfolgreich hochgeladen `);

      const { data: publicURL } = supabase.storage
        .from("photos")
        .getPublicUrl(data.path);

      if (publicURL) {
        setImageUrl(publicURL.publicUrl);
      }
    } catch (err) {
      console.error("Fehler beim Hochladen:", err);
      setUploadError("Hochladen fehlgeschlagen ");
    } finally {
      setIsUploading(false);

      event.target.value = "";
    }
  };

  const handleImageChange = async () => {
    if (!imageFileName) return;

    try {
      const { error } = await supabase.storage
        .from("photos")
        .remove([imageFileName]);

      if (error) {
        throw new Error(error.message);
      }

      setImageUrl(null);
      setImageFileName(null);
      setUploadSuccess("");
    } catch (err) {
      console.error("Fehler beim Ändern des Bildes:", err);
      setUploadError("Ändern fehlgeschlagen ");
    }
  };

  return (
    <>
      <section className="stn-secondary">
        <div className="card bg-base-100 my-12 max-w-sm md:max-w-md">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="headline-1 my-12  text-center">
              Neues Rezept erstellen
            </h1>

            <div className="form-control w-full">
              <input
                {...register("name")}
                type="text"
                className={`input input-bordered ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="Rezeptname"
              />
              {errors.name && (
                <p className="text-error-form">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <textarea
                {...register("description")}
                className={`textarea textarea-bordered h-24 ${
                  errors.description ? "textarea-error" : ""
                }`}
                placeholder="Beschreibung"
              ></textarea>
              {errors.description && (
                <p className="text-error-form">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <textarea
                {...register("instructions")}
                className={`textarea textarea-bordered h-44 ${
                  errors.instructions ? "textarea-error" : ""
                }`}
                placeholder="Anleitung z.B, 
Mehl, Milch und Eier verrühren.
In einer Pfanne etwas Butter erhitzen.
Teig portionsweise goldbraun braten."
              ></textarea>
              {errors.instructions && (
                <p className="text-error-form">
                  {errors.instructions.message}
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <select
                {...register("servings")}
                className={`select select-bordered font-semibold ${
                  errors.servings ? "select-error" : ""
                }`}
                defaultValue=""
              >
                <option value="">Portionen</option>
                <option value="1">1 Portion</option>
                <option value="2">2 Portionen</option>
                <option value="3">3 Portionen</option>
                <option value="4">4 Portionen</option>
                <option value="5">5 Portionen</option>
              </select>
              {errors.servings && (
                <p className="text-error-form">
                  {errors.servings.message}
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <select
                {...register("category_id")}
                className={`select select-bordered font-semibold ${
                  errors.category_id ? "select-error" : ""
                }`}
                defaultValue=""
              >
                <option value="">Kategorie</option>
                <option value="12595269-31df-4a3a-b3c7-7494fe5661c5">
                  Getränke
                </option>
                <option value="4e29dd29-d50b-4f8b-8120-4d0487f76b96">
                  Hauptspeise
                </option>
                <option value="5162be92-4ab3-4cdf-ba2e-2d9a0e10943f">
                  Vorspeise
                </option>
                <option value="53085e10-fe7a-4f4b-8238-2933a63783cd">
                  Snack
                </option>
                <option value="891d36b2-07ee-4afe-ac06-996fd4c793ed">
                  Frühstück
                </option>
                <option value="933f18c3-052b-4989-9f74-4d692fda1473">
                  Dessert
                </option>
              </select>
              {errors.category_id && (
                <p className="text-error-form">
                  {errors.category_id.message}
                </p>
              )}
            </div>

            <div className="form-control w-full mt-4">
              <div className="flex items-center">
                <p className="mr-8 font-semibold">Bewertung</p>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <input
                      key={value}
                      type="radio"
                      value={value.toString()}
                      className="mask mask-star-2 bg-orange-400"
                      checked={watchRating === value.toString()}
                      onChange={() => setValue("rating", value.toString())}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text font-semibold">
                  Bild für das Rezept hochladen
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
                {!imageUrl && (
                  <button
                    type="button"
                    className="btn btn-neutral rounded-full sm:w-auto"
                    onClick={() =>
                      document
                        .querySelector<HTMLInputElement>('input[type="file"]')
                        ?.click()
                    }
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Hochladen"
                    )}
                  </button>
                )}
              </div>
            </div>

            {uploadError && (
              <div className="alert alert-error shadow-lg mt-2">
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
                  <span>{uploadError}</span>
                </div>
              </div>
            )}

            {uploadSuccess && (
              <div className="alert alert-success shadow-lg mt-2">
                <div className="flex-between w-full font-semibold">
                  <span>{uploadSuccess}</span>
                  <button
                    type="button"
                    className="btn-action-neutral"
                    onClick={handleImageChange}
                  >
                    Bild ändern
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn-action mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Rezept speichern"
              )}
            </button>

            {error && (
              <div className="alert alert-error shadow-lg mt-4">
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
              <div className="alert alert-success shadow-lg mt-4">
                <div className="flex items-center font-semibold">
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
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateRecipe;
