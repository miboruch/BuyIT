import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MenuContext } from '../../../context/MenuContext';
import { useTrail, animated } from 'react-spring';
import { menuItems } from '../../../utils/contentArrays';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 1s ease;
  z-index: 500;
  display: flex;
  align-items: center;
`;

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const OverflowBox = styled.div`
  overflow: hidden;
`;

const StyledListItem = styled(animated.li)`
  font-family: ${({ theme }) => theme.font.family.futura};
  letter-spacing: 2px;
  padding-bottom: 1rem;
  font-weight: lighter;
  font-size: 40px;
  color: #dfdfdf;
`;

const Menu = ({ isLoggedIn }) => {
  const { isMenuOpen, toggleMenu } = useContext(MenuContext);

  const allMenuItems = menuItems(isLoggedIn);
  const menuTrail = useTrail(allMenuItems.length, {
    opacity: isMenuOpen ? 1 : 0,
    transform: isMenuOpen ? 'matrix(1,0,0,1,0,0)' : 'matrix(0.99, 0.33, 0, 1, 0, 100)',
    from: { opacity: 0, transform: 'matrix(0.99, 0.33, 0, 1, 0, 100)' },
    reverse: !isMenuOpen,
    delay: 700
  });

  return (
    <StyledWrapper isOpen={isMenuOpen}>
      <StyledList>
        {menuTrail.map((props, index) => (
          <Link to={allMenuItems[index].link} key={index}>
            <OverflowBox>
              <StyledListItem style={props} onClick={() => toggleMenu()}>
                {allMenuItems[index].name}
              </StyledListItem>
            </OverflowBox>
          </Link>
        ))}
      </StyledList>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { isLoggedIn } }) => {
  return { isLoggedIn };
};

Menu.propTypes = {
  isLoggedIn: PropTypes.bool
};

export default connect(mapStateToProps)(Menu);
