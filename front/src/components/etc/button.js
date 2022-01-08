import styled from "styled-components";

export const Btn = styled.div`
  outline: none;
  border: 2px solid white;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 40px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.3);
  }
`;
