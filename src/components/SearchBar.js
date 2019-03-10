import React from 'react'
import styled from 'styled-components'

export const SearchBar = ({submit}) => {
  return (
    <form onSubmit={submit}>
      <StyledInput id="search" name="search" placeholder={"Input search request and press Submit"}/>
      <StyledButton>Submit</StyledButton>
    </form>
  )
};

const StyledInput = styled.input`
  width: calc(100% - 72px);
  padding: 1px 5px;
`;

const StyledButton = styled.button`
  width: 58px;
`

