import { FunctionComponent } from "react";
import { useCategory } from "../../../providers/Category";
import { DeleteWarning, GlobalContainer } from "../../../styles/global";
import { ICategory } from "../../../types/entity-types";
import DeleteButton from "../../Button_Delete";
import { useParams } from "react-router-dom";

interface CategoryDeleteFormProps {
    category: ICategory
}

const CategoryDeleteForm: FunctionComponent<CategoryDeleteFormProps> = ({category}) => {
  
    const { deleteCategory } = useCategory();

    const { event_id } = useParams()

  return (
    <GlobalContainer>
      <p>Você tem certeza que deseja deletar a categoria:</p>
      <h3>{category.name}</h3>
      <DeleteWarning>
        Todos os Scores e Fases que estão cadastrados nesta categorias serão perdidos! Pense bem antes de fazer a deleção!
      </DeleteWarning>

      <DeleteButton
        vanilla={false}
        onClick={() => deleteCategory(Number(category.category_id), Number(event_id))}
      >
        Deletar
      </DeleteButton>
    </GlobalContainer>
  );
};

export default CategoryDeleteForm;
