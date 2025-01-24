import { useContext, useRef, useState } from "react";
import { Recipe } from "../utils/types";
import { supabase } from "../utils/supabaseClient";
import { UserContext } from "../context/Context";
import Hero from "../components/Hero";

const CreateRecipe = () => {
  const nameRef = useRef<HTMLInputElement>(null!);
  const descriptionRef = useRef<HTMLTextAreaElement>(null!);
  const servingsRef = useRef<HTMLSelectElement>(null!);
  const instructionsRef = useRef<HTMLTextAreaElement>(null!);
  const categoryIdRef = useRef<HTMLSelectElement>(null!);
  const imageFileRef = useRef<HTMLInputElement>(null!);
  const imageFileNameForRemoveRef = useRef<string>(null!);

  const ratingRef = useRef<string | null>(null!);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const imageUrlRef = useRef<string | null>(null!);
  const { user } = useContext(UserContext);

  async function createNewRecipe() {
    const nameValue = nameRef.current?.value;
    const descriptionValue = descriptionRef.current?.value;
    const servingsValue = servingsRef.current?.value;
    const instructionsValue = instructionsRef.current?.value;
    const categoryIdValue = categoryIdRef.current?.value;
    const ratingValue = ratingRef.current;

    const instructionsArr = instructionsValue.split(/([.!?])\s*/);
    const processedInstructions = instructionsArr
      .map((sentence, index) => {
        if (index % 2 === 0 && sentence.trim() !== "") {
          return sentence.trim() + ";";
        }
        return sentence;
      })
      .join(" ");

    if (
      !nameValue ||
      !descriptionValue ||
      !servingsValue ||
      !instructionsValue ||
      !categoryIdValue
    ) {
      setError(
        "Name, description, servings, instructions und category müssen ausgefüllt sein."
      );
      setSuccess("");
      return;
    }

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
      name: nameValue,
      description: descriptionValue,
      servings: Number(servingsValue),
      instructions: processedInstructions,
      category_id: categoryIdValue,
      imageUrl: imageUrlRef.current,
      rating: Number(ratingValue),
    };

    const { data, error } = await supabase
      .from("recipes")
      .insert(newRecipe)
      .select();

    if (error) {
      setSuccess("");
      setError(error.message);
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      servingsRef.current.value = "";
      instructionsRef.current.value = "";
      categoryIdRef.current.value = "";
      setUploadError("");
      setUploadSuccess("");
    }
    if (data) {
      setError("");
      setSuccess("Successfully the new Recipe is created! 🥰");
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      servingsRef.current.value = "";
      instructionsRef.current.value = "";
      categoryIdRef.current.value = "";
      setUploadError("");
      setUploadSuccess("");
    }
  }

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ratingRef.current = event.target.value;
  };

  async function uploadImgFile() {
    try {
      if (imageFileRef.current.files && user) {
        const imageFile = imageFileRef.current?.files[0];
        const fileName = `${user.id}_${imageFile.name}`;
        imageFileNameForRemoveRef.current = fileName;
        const { data, error } = await supabase.storage
          .from("photos")
          .upload(fileName, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (data) {
          setUploadSuccess(`"${imageFile.name}" ✅uploaded`);
          setUploadError("");

          const { data: publicURL } = supabase.storage
            .from("photos")
            .getPublicUrl(data.path);

          if (publicURL) {
            imageUrlRef.current = publicURL.publicUrl;
          }
        }
        if (error) {
          setUploadSuccess("");
          setUploadError("Failed to upload ❌");
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      setUploadSuccess("");
      setUploadError("Failed to upload ❌");
    } finally {
      imageFileRef.current.value = "";
    }
  }

  async function changeImgFile() {
    const { data, error } = await supabase.storage
      .from("photos")
      .remove([imageFileNameForRemoveRef.current]);
    if (data) {
      setUploadSuccess("");
      imageUrlRef.current = "";
    }
    if (error) {
      setUploadSuccess("");
      setUploadError("Failed to change ❌");
    }
  }

  return (
    <>
      {" "}
      <Hero
        text={
          "Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie unvergessliche Momente bei Tisch."
        }
        imgUrl={
          "https://images.unsplash.com/photo-1577308856961-8e9ec50d0c67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <section className="flex flex-col gap-4 mt-20">
        <h1
          className="text-3xl text-center font-bold
      mb-6"
        >
          Create New Recipe
        </h1>
        <label className="max-w-xs input input-bordered flex items-center gap-2">
          <input
            ref={nameRef}
            name="RecipeName"
            type="text"
            className="grow"
            placeholder="Recipe Name"
          />
        </label>
        <label className="form-control max-w-xs ">
          <textarea
            ref={descriptionRef}
            className="textarea textarea-bordered h-24"
            name="Description"
            placeholder="Description"
          ></textarea>
        </label>
        <label className="form-control max-w-xs ">
          <textarea
            ref={instructionsRef}
            className="textarea textarea-bordered h-44"
            name="Instructions"
            placeholder="Instructions z.B, 
          Mehl, Milch und Eier verrühren.
          In einer Pfanne etwas Butter erhitzen.
          Teig portionsweise goldbraun braten."
          ></textarea>
        </label>

        <select
          ref={servingsRef}
          name="servings"
          className="select select-bordered  max-w-xs"
          defaultValue=""
        >
          <option value={""}>Servings</option>
          <option value={1}>1 Serving</option>
          <option value={2}>2 Servings</option>
          <option value={3}>3 Servings</option>
          <option value={4}>4 Servings</option>
          <option value={5}>5 Servings</option>
        </select>
        <select
          ref={categoryIdRef}
          name="categoryId"
          className="select select-bordered  max-w-xs"
          defaultValue=""
        >
          <option value={""}>Category</option>
          <option value={"12595269-31df-4a3a-b3c7-7494fe5661c5"}>
            Getränke
          </option>
          <option value={"4e29dd29-d50b-4f8b-8120-4d0487f76b96"}>
            Hauptspeise
          </option>
          <option value={"5162be92-4ab3-4cdf-ba2e-2d9a0e10943f"}>
            Vorspeise
          </option>
          <option value={"53085e10-fe7a-4f4b-8238-2933a63783cd"}>Snack</option>
          <option value={"891d36b2-07ee-4afe-ac06-996fd4c793ed"}>
            Frühstück
          </option>
          <option value={"933f18c3-052b-4989-9f74-4d692fda1473"}>
            Dessert
          </option>
        </select>
        <div className="rating mt-4">
          <p className="mr-8">Rating</p>
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              type="radio"
              name="rating"
              value={value.toString()}
              className="mask mask-star-2 bg-orange-400"
              onChange={handleRatingChange}
            />
          ))}
        </div>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">
              Upload an image file for the new recipe
            </span>
          </div>
          <div className="flex gap-6 justify-start items-center">
            <input
              type="file"
              ref={imageFileRef}
              className="file-input file-input-bordered min-w-full "
            />
            <button
              type="button"
              className="btn btn-neutral max-w-xs"
              onClick={uploadImgFile}
            >
              Upload
            </button>
          </div>
        </label>
        <div>
          {uploadError.length > 0 && (
            <p className="text-red-600 text-center">🚨{uploadError}</p>
          )}
          {uploadSuccess.length > 0 && (
            <div className="flex gap-6 items-center">
              <p className="text-green-900 text-center max-w-xs ">
                {uploadSuccess}
              </p>{" "}
              <button
                type="button"
                className="btn btn-neutral mt-6 max-w-xs "
                onClick={changeImgFile}
              >
                Change File
              </button>
            </div>
          )}
        </div>
        <button
          type="button"
          className="btn btn-accent mt-6 max-w-xs"
          onClick={createNewRecipe}
        >
          Save New Recipe🪄
        </button>
        <div className="max-w-xs">
          {error.length > 0 && (
            <p className="text-red-600 text-center">🚨{error}</p>
          )}
          {success.length > 0 && (
            <p className="text-green-900 text-center">{success}</p>
          )}
        </div>
      </section>
    </>
  );
};

export default CreateRecipe;
