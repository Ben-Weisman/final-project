import React from "react";
import AddRecipeURl from "../components/Forms/AddRecipeURL";
import InsertRecipeManualForm from "../components/Forms/InsertRecipeManualForm";

const AddRecipePage = () => {
  return (
    <div>
      <div>
        <AddRecipeURl></AddRecipeURl>
      </div>
      <div>
        <InsertRecipeManualForm></InsertRecipeManualForm>
      </div>
    </div>
  );
};

export default AddRecipePage;
