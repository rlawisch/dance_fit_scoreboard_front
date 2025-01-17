import { FunctionComponent } from "react";
import { GlobalContainer } from "../../styles/global";
import { ContentList, ContentListItem, HorizontalRuler, PatchTitle } from "./styles";

interface DashboardHomeProps {}

const DashboardHome: FunctionComponent<DashboardHomeProps> = () => {
  return (
    <GlobalContainer>
      <PatchTitle>Notas de Atualização - 09/06/24</PatchTitle>

      <HorizontalRuler />

      <ContentList>
        <ContentListItem>
          Erro ao fazer upload de foto de perfil corrigido.    
        </ContentListItem>
        <ContentListItem>
          Nova lista de formatos suportados de arquivos de imagem tanto ao altera a foto de perfil quanto no envio de scores (o tamanho continua o mesmo, até 8MB): .jpg, .jpeg, .png, .heic, .gif, .bmp, .tiff, .tif, .webp ou .svg.
        </ContentListItem>
        <ContentListItem>
          Prévia do formulário de cadastro de Scores adicionada, as músicas que estiverem dentro dos níveis selecionados para o jogador(a) terão um botão de envio de score na Lista de Músicas do evento. Ainda não liberado o envio (ciclo de envio e reenvio ainda em desenvolvimento), mas já dá pra ter uma ideia de como vai funcionar.
        </ContentListItem>
      </ContentList>
    </GlobalContainer>
  );
};

export default DashboardHome;
