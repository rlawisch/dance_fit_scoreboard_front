import { IProfilePicFormData } from "./../types/form-types";
import { Resolver } from "react-hook-form";
import * as yup from "yup";

export const profilePictureResolver: Resolver<IProfilePicFormData> = async (
  values,
) => {
  try {
    // Define your Yup schema for validation
    const schema = yup.object().shape({
      file: yup
        .mixed()
        .required("Please select an image file")
        .test("fileSize", "File size is too large (max: 8MB)", (value: any) => {
          return !value || (value[0] && value[0].size <= 8 * 1024 * 1024);
        })
        .test(
          "fileType",
          "Invalid file format. Only JPEG or PNG are allowed.",
          (value: any) => {
            return (
              !value ||
              (value[0] && ["image/jpeg", "image/png"].includes(value[0].type))
            );
          },
        ),
    });

    // Validate the form values against the schema
    await schema.validate(values, { abortEarly: false });

    // If validation passes, return undefined (no errors)
    return {
      values: values,
      errors: {},
    };
  } catch (error) {
    // If validation fails, format the Yup error messages and return them
    if (error instanceof yup.ValidationError) {
      const validationErrors: Record<string, string> = {};

      // Iterate over Yup validation errors and format them
      error.inner.forEach((err) => {
        if (err.path) {
          validationErrors[err.path] = err.message;
        }
      });

      // Return the formatted validation errors
      return {
        values: {},
        errors: validationErrors,
      };
    }

    // Return any other errors as generic form errors
    return {
      values: {},
      errors: { "": "An unexpected error occurred. Please try again." },
    };
  }
};
