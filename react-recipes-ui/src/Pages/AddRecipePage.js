import React from "react";
import AddRecipeManual from "../components/Forms/addRecipeManual";
import AddRecipeURl from "../components/Forms/AddRecipeURL";

const AddRecipePage = () => {
  return (
    <div>
      <div>
        <AddRecipeURl></AddRecipeURl>
      </div>
      <div>
        <AddRecipeManual></AddRecipeManual>
      </div>
    </div>
  );
};

export default AddRecipePage;
