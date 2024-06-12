import { FunctionComponent } from "react";
import { GlobalContainer } from "../../styles/global";
import {
  ContentList,
  ContentListItem,
  HorizontalRuler,
  PatchTitle,
} from "./styles";

interface DashboardHomeProps {}

const DashboardHome: FunctionComponent<DashboardHomeProps> = () => {
  return (
    <GlobalContainer>
      <PatchTitle>Notas de Atualização - 11/06/24</PatchTitle>

      <HorizontalRuler />

      <ContentList>
        <ContentListItem>
          Visual do Ranking Geral e sua responsividade melhoradas.
        </ContentListItem>

        <ContentListItem>
          Fórmula da Pontuação alterada para que a pontuação máxima possível no Ranking seja <strong>100</strong>. (Score Total do Jogador / (Número do Ranking * 10000)) esse valor então é truncado em duas casas decimais e arredondado usando a seguinte regra: se o próximo dígito for 5 ou menor, arredonda pra baixo, se for 6 ou maior, arredonda pra cima.
        </ContentListItem>
      </ContentList>

      <PatchTitle>Notas de Atualização - 09/06/24 - Parte III</PatchTitle>

      <HorizontalRuler />

      <ContentList>
        <ContentListItem>
          Corrigido erro no envio de Scores onde mesmo mandando Stage Break, o
          Score ficava com Stage Pass.
        </ContentListItem>
      </ContentList>

      <PatchTitle>Notas de Atualização - 09/06/24 - Parte II</PatchTitle>

      <HorizontalRuler />

      <ContentList>
        <ContentListItem>
          Envio de Scores liberado, através da Lista de Música o jogador pode
          agora enviar os Scores para o evento. LEIAM as informações na página
          da Lista de Músicas do evento.
        </ContentListItem>
        <ContentListItem>
          Ranking Geral dos eventos do tipo Dinâmica disponível (ainda bem
          simples).
        </ContentListItem>
      </ContentList>

      <PatchTitle>Notas de Atualização - 09/06/24</PatchTitle>

      <HorizontalRuler />

      <ContentList>
        <ContentListItem>
          Erro ao fazer upload de foto de perfil corrigido.
        </ContentListItem>
        <ContentListItem>
          Nova lista de formatos suportados de arquivos de imagem tanto ao
          altera a foto de perfil quanto no envio de scores (o tamanho continua
          o mesmo, até 8MB): .jpg, .jpeg, .png, .heic, .gif, .bmp, .tiff, .tif,
          .webp ou .svg.
        </ContentListItem>
        <ContentListItem>
          Prévia do formulário de cadastro de Scores adicionada, as músicas que
          estiverem dentro dos níveis selecionados para o jogador(a) terão um
          botão de envio de score na Lista de Músicas do evento. Ainda não
          liberado o envio (ciclo de envio e reenvio ainda em desenvolvimento),
          mas já dá pra ter uma ideia de como vai funcionar.
        </ContentListItem>
      </ContentList>
    </GlobalContainer>
  );
};

export default DashboardHome;
