import { FunctionComponent } from "react";
import { ICategory } from "../../../types/entity-types";
import {
  ContentWrapper,
  FormWrapper,
  GlobalContainer,
} from "../../../styles/global";
import { useCategory } from "../../../providers/Category";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICategoryUpdate } from "../../../types/form-types";
import Input from "../../Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import UpdateButton from "../../Button_Update";
import { toast } from "react-toastify";

interface CategoryUpdateFormProps {
  category: ICategory;
}

const CategoryUpdateForm: FunctionComponent<CategoryUpdateFormProps> = ({
  category,
}) => {
  const { updateCategory } = useCategory();

  const updateCategoryFormSchema = yup.object().shape({
    name: yup
      .string()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      ),
    level_min: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      ),
    level_max: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      ),
    number_of_phases: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      ),
  });

  const {
    register: registerUpdateCategory,
    handleSubmit: handleSubmitUpdateCategory,
    formState: { errors: updateCategoryErrors },
  } = useForm({
    resolver: yupResolver(updateCategoryFormSchema),
  });

  const onUpdateCategoryFormSubmit = (
    formData: ICategoryUpdate,
    category: ICategory,
  ) => {

    if (JSON.stringify(formData) === "{}") {
      toast.error(
        "Nenhum campo preenchido, não é possível fazer a atualização",
      );
      return;
    }

    const filteredFormData: Partial<ICategoryUpdate> = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined),
    );

    updateCategory(filteredFormData, category);
  };

  return (
    <GlobalContainer>
      <ContentWrapper>
        <p>Atualizar informações da Categoria: {category.name}</p>
        <FormWrapper
          onSubmit={handleSubmitUpdateCategory(
            (formData) => onUpdateCategoryFormSubmit(formData, category), // Pass the event parameter
          )}
        >
          <Input
            label="Nome"
            icon={MdDriveFileRenameOutline}
            name="name"
            register={registerUpdateCategory}
            error={updateCategoryErrors.name?.message}
          />

          <Input
            label="Nivel mínimo"
            icon={FaArrowAltCircleDown}
            name="level_min"
            type="number"
            register={registerUpdateCategory}
            error={updateCategoryErrors.level_min?.message}
          />

          <Input
            label="Nível máximo"
            icon={FaArrowAltCircleUp}
            name="level_max"
            type="number"
            register={registerUpdateCategory}
            error={updateCategoryErrors.level_max?.message}
          />

          <Input
            label="Número de Fases"
            icon={MdDriveFileRenameOutline}
            name="number_of_phases"
            type="number"
            register={registerUpdateCategory}
            error={updateCategoryErrors.number_of_phases?.message}
          />

          <UpdateButton vanilla={false} type="submit">
            Atualizar
          </UpdateButton>
        </FormWrapper>
      </ContentWrapper>
    </GlobalContainer>
  );
};

export default CategoryUpdateForm;
