import { FunctionComponent } from "react";
import { IEvent } from "../../../types/entity-types";
import { useCategory } from "../../../providers/Category";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICategoryCreate } from "../../../types/form-types";
import { FormWrapper, GlobalContainer } from "../../../styles/global";
import Input from "../../Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import Button from "../../Button";

interface CategoryCreateFormProps {
  event: IEvent | undefined;
}

const CategoryCreateForm: FunctionComponent<CategoryCreateFormProps> = ({
  event,
}) => {
  const { createCategory } = useCategory();

  const createCategoryFormSchema = yup.object().shape({
    name: yup.string().required("Preencha este campo"),
    level_min: yup.number().required("Preencha este campo"),
    level_max: yup.number().required("Preencha este campo"),
    number_of_phases: yup.number().required("Preencha este campo"),
  });

  const {
    register: registerCreateCategory,
    handleSubmit: handleSubmitCreateCategory,
    formState: { errors: createCategoryErrors },
  } = useForm({
    resolver: yupResolver(createCategoryFormSchema),
  });

  const onCreateCategoryFormSubmit = (formData: ICategoryCreate) => {
    createCategory(formData, Number(event?.event_id));
  };

  return (
    <GlobalContainer>
      Criar Categoria:
      <FormWrapper
        id="create_category_form"
        onSubmit={handleSubmitCreateCategory(onCreateCategoryFormSubmit)}
      >
        <Input
          label="Nome"
          icon={MdDriveFileRenameOutline}
          name="name"
          register={registerCreateCategory}
          error={createCategoryErrors.name?.message}
        />

        <Input
          label="Nivel mínimo"
          icon={FaArrowAltCircleDown}
          name="level_min"
          register={registerCreateCategory}
          error={createCategoryErrors.level_min?.message}
        />

        <Input
          label="Nível máximo"
          icon={FaArrowAltCircleUp}
          name="level_max"
          register={registerCreateCategory}
          error={createCategoryErrors.level_max?.message}
        />

        <Input
          label="Número de Fases"
          icon={MdDriveFileRenameOutline}
          name="number_of_phases"
          register={registerCreateCategory}
          error={createCategoryErrors.number_of_phases?.message}
        />

        <Button vanilla={false} type="submit" form="create_category_form">
          Criar
        </Button>
      </FormWrapper>
    </GlobalContainer>
  );
};

export default CategoryCreateForm;
