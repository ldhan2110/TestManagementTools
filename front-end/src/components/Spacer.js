import styled from "styled-components";

const Spacer = styled.div(props => ({
  width: `${props.size * 5}px`
}));

Spacer.defaultProps = {
  size: 1
};

export default Spacer;
