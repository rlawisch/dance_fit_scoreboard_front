import { FunctionComponent } from "react";
import { useCategory } from "../../../providers/Category";
import {
  ContentWrapper,
  DeleteWarning,
  GlobalContainer,
} from "../../../styles/global";
import { ICategory } from "../../../types/entity-types";
import DeleteButton from "../../Button_Delete";

interface CategoryDeleteFormProps {
  category: ICategory;
}

const CategoryDeleteForm: FunctionComponent<CategoryDeleteFormProps> = ({
  category,
}) => {
  const { deleteCategory } = useCategory();

  return (
    <GlobalContainer>
      <ContentWrapper>
        <p>Você tem certeza que deseja deletar a categoria:</p>
        <h3>{category.name}</h3>
        <DeleteWarning>
          Todos os Scores e Fases que estão cadastrados nesta categorias serão
          perdidos! Pense bem antes de fazer a deleção!
        </DeleteWarning>

        <DeleteButton
          vanilla={false}
          onClick={() => deleteCategory(Number(category.category_id))}
        >
          Deletar
        </DeleteButton>
      </ContentWrapper>
    </GlobalContainer>
  );
};

export default CategoryDeleteForm;
