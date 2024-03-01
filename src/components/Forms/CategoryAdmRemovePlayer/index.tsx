import { FunctionComponent } from "react";
import {
  DeleteWarning,
  GlobalContainer,
  PlayerInfoWrapper,
  PlayerMiniature,
} from "../../../styles/global";
import { ICategory, IPlayer } from "../../../types/entity-types";
import { useCategory } from "../../../providers/Category";
import DeleteButton from "../../Button_Delete";

interface CategoryAdmRemovePlayerFormProps {
  player: IPlayer;
  category: ICategory;
}

const CategoryAdmRemovePlayerForm: FunctionComponent<
  CategoryAdmRemovePlayerFormProps
> = ({ player, category }) => {
  const { adminRemovePlayer } = useCategory();

  return (
    <GlobalContainer>
      <p>Você tem certeza que deseja remover o jogador:</p>

      <PlayerInfoWrapper>
        <PlayerMiniature
          src={
            player.profilePicture
              ? player.profilePicture
              : "/img/default_player.png"
          }
          alt="Mini Profile Picture"
        />
        {player.nickname}
      </PlayerInfoWrapper>

      <DeleteWarning>
        Todos os Scores que o jogador tiver cadastrado nesta categoria serão
        APAGADOS! Pense bem antes de fazer a deleção!
      </DeleteWarning>

      <DeleteButton
        vanilla={false}
        onClick={() =>
          adminRemovePlayer(
            Number(category.category_id),
            Number(player.player_id)
          )
        }
      >
        Remover
      </DeleteButton>
    </GlobalContainer>
  );
};

export default CategoryAdmRemovePlayerForm;
