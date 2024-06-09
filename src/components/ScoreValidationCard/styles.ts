import { shade } from "polished";
import styled from "styled-components";

export const ScoreValidationCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  margin-bottom: 32px;
  padding: 16px;
  border-radius: 8px;

  background-color: ${(props) => shade(0.2, props.theme.colors.background)};

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const ScoreValidationMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 25%;
`;

export const ScoreValidationImageWrapper = styled.div`
  min-width: 25%;
`;

export const ScoreImage = styled.img`
  max-width: 65%;

  @media screen and (min-width: 768px) {
    max-width: 100%;
  }
`;

export const ScoreValidationDetailedInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0.4rem;
  min-width: 25%;
`;

export const ScoreValidationActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 25%;

  @media screen and (min-width: 768px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;
