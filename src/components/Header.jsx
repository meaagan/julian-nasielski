import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Logo from "components/_ui/Logo";
import Button from "components/_ui/Button";

const HeaderContainer = styled("div")`
    padding-top: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid #c5c5c5;
    margin-bottom:2em;
`

const HeaderContent = styled("div")`
    display: flex;
    justify-content: space-between;
`

const StyledLink = styled(Link)`
    color: currentColor;
    text-decoration: none;
    display: block;
    position: relative;
    padding: 5px;
    border-radius: 5px;
    background-color: none;

    &:hover {
        background: ${colors.yellow100};
        transition: background-color 200ms ease-in-out;
    }
`

const HeaderLinks = styled("div")`
    display: grid;
    grid-template-columns: repeat(2, auto);
    // grid-gap: 7em;
    justify-content: flex-end;
    width: 100%;
    max-width: 200px;
    text-decoration: none;

    @media(max-width: ${dimensions.maxwidthTablet}px) {
        grid-gap: 5.5em;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        grid-gap: 2.5em;
    }
`

const Header = () => (
    <HeaderContainer>
        <HeaderContent>
            <StyledLink to="/">
                <Logo />
            </StyledLink>
            <HeaderLinks>
                <a href="/#about" rel="noreferrer">
                    <Button>About Me</Button>
                </a>
            </HeaderLinks>
        </HeaderContent>
    </HeaderContainer>
)

export default Header;