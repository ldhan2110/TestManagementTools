import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ellipsis, rgba } from "polished";
import { connect } from 'react-redux';
import { NavLink as RouterNavLink, withRouter } from "react-router-dom";
import { darken } from "polished";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../vendor/perfect-scrollbar.css";

import { spacing } from "@material-ui/system";

import {
  Box as MuiBox,
  Chip,
  Collapse,
  Drawer as MuiDrawer,
  List as MuiList,
  ListItem,
  ListItemText,
  Typography,
  Tooltip,
  IconButton as MuiIconButton
} from "@material-ui/core";
import ReadMore from 'read-more-react';
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import { green } from "@material-ui/core/colors";

import { sidebarRoutes as routes } from "../routes/index";
import { Home } from "react-feather";


const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Box = styled(MuiBox)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  max-width: 195px;
`;

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${props => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: ${props => props.theme.sidebar.background};
`;

const Items = styled.div`
  padding-top: ${props => props.theme.spacing(2.5)}px;
  padding-bottom: ${props => props.theme.spacing(2.5)}px;
`;

const Brand = styled(ListItem)`
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props => props.theme.sidebar.header.color};
  background-color: ${props => props.theme.sidebar.header.background};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${props => props.theme.spacing(3)}px;
  padding-right: ${props => props.theme.spacing(5)}px;
  cursor: default;

  ${props => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${props => props.theme.sidebar.header.background};
  }
`;


const BrandChip = styled(Chip)`
  background-color: ${green[700]};
  border-radius: 5px;
  color: ${props => props.theme.palette.common.white};
  font-size: 60%;
  height: 20px;
  margin-left: 2px;
  margin-bottom: 1px;
  padding: 4px 0;

  span {
    padding-left: ${props => props.theme.spacing(1.5)}px;
    padding-right: ${props => props.theme.spacing(1.5)}px;
  }
`;

const Category = styled(ListItem)`
  padding-top: ${props => props.theme.spacing(3)}px;
  padding-bottom: ${props => props.theme.spacing(3)}px;
  padding-left: ${props => props.theme.spacing(6)}px;
  padding-right: ${props => props.theme.spacing(5)}px;
  font-weight: ${props => props.theme.typography.fontWeightRegular};

  svg {
    color: ${props => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &.${props => props.activeClassName} {
    background-color: ${props => darken(0.05, props.theme.sidebar.background)};

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`;

const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${props => props.theme.sidebar.color};
    font-size: ${props => props.theme.typography.body1.fontSize}px;
    font-weight: ${props => props.theme.sidebar.category.fontWeight};
    padding: 0 ${props => props.theme.spacing(4)}px;
  }
`;

const CategoryIconLess = styled(ExpandLess)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`;

const CategoryIconMore = styled(ExpandMore)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`;

const Link = styled(ListItem)`
  padding-left: ${props => props.theme.spacing(15)}px;
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-bottom: ${props => props.theme.spacing(2)}px;

  span {
    color: ${props => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover span {
    color: ${props => rgba(props.theme.sidebar.color, 0.9)};
  }

  &.${props => props.activeClassName} {
    background-color: ${props => darken(0.06, props.theme.sidebar.background)};

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`;

const LinkText = styled(ListItemText)`
  color: ${props => props.theme.sidebar.color};
  span {
    font-size: ${props => props.theme.typography.body1.fontSize}px;
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${props => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 12px;
  top: 8px;
  background: ${props => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${props => props.theme.sidebar.badge.color};
    padding-left: ${props => props.theme.spacing(2)}px;
    padding-right: ${props => props.theme.spacing(2)}px;
  }
`;

const CategoryBadge = styled(LinkBadge)`
  top: 12px;
`;

const SidebarSection = styled(Typography)`
  color: ${props => props.theme.sidebar.color};
  padding: ${props => props.theme.spacing(4)}px
    ${props => props.theme.spacing(6)}px ${props => props.theme.spacing(1)}px;
  opacity: 0.9;
  display: block;
`;

function SidebarCategory({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  badge,
  ...rest
}) {
  return (
    <Category {...rest}>
      {icon}
      <CategoryText>{name}</CategoryText>
      {isCollapsable ? (
        isOpen ? (
          <CategoryIconMore />
        ) : (
            <CategoryIconLess />
          )
      ) : null}
      {badge ? <CategoryBadge label={badge} /> : ""}
    </Category>
  );
}

function SidebarLink({ name, to, badge }) {
  return (
    <Link
      button
      dense
      component={NavLink}
      exact
      to={to}
      activeClassName="active"
    >
      <LinkText>{name}</LinkText>
      {badge ? <LinkBadge label={badge} /> : ""}
    </Link>
  );
}

function getRoute(path) {
  let args = Array.prototype.slice.call(arguments, 1);
  let count = -1;
  return path.replace(/:[a-zA-Z?]+/g, function (match) {
      count += 1;
      return args[count] !== undefined ? args[count] : match;
  });
};

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { currentSelectedProject: state.project.currentSelectedProject, currentSelectedProjectName: state.project.currentSelectedProjectName, currentRole: state.project.currentRole}
}


function Sidebar({ classes, staticContext, location, currentSelectedProject,currentSelectedProjectName, currentRole, dispatch, ...rest }) {
  const initOpenRoutes = () => {
    /* Open collapse element that matches current url */
    const pathName = location.pathname;

    let _routes = {};


    routes.forEach((route, index) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === "/" ? true : false;

      _routes = Object.assign({}, _routes, { [index]: isActive || isOpen || isHome })
    });

    return _routes;
  };


  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes());
  const history = useHistory();
  const toggle = index => {
    // Collapse all elements
    Object.keys(openRoutes).forEach(
      item => openRoutes[index] || setOpenRoutes(openRoutes => Object.assign({}, openRoutes, { [item]: false }))
    )

    // Toggle selected element
    setOpenRoutes(openRoutes => Object.assign({}, openRoutes, { [index]: !openRoutes[index] }));
  }

  const handleClick = () => {
    history.replace('/projects');
  }
  
  const [disableHoverTooltip, setDisableHoverTooltip] = useState(false);
  useEffect(()=>{isEllipsisActive()},[currentSelectedProjectName])

  function isEllipsisActive() {
    var offsetWidth = document.getElementById('boxProject').offsetWidth;
    //not long enough
    if(offsetWidth < 160)
      setDisableHoverTooltip(true);
    // long enough
    else{
      setDisableHoverTooltip(false);
    }
  }

  return (
    <Drawer variant="permanent"  { ...rest}>
      <Brand>
        <IconButton color="inherit" aria-label="Open drawer" onClick={handleClick}><Home/></IconButton>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Tooltip title={<div style={{fontSize:15, lineHeight:'1.4rem'}}>{currentSelectedProjectName}</div>} arrow
            placement="right-end" enterDelay={700} leaveTouchDelay={2000} interactive disableHoverListener={disableHoverTooltip}>
            <Box ml={1} id='boxProject'>
              {currentSelectedProjectName}
            </Box>
          </Tooltip>
          - {currentRole} -
        </div>
      </Brand>
      <Scrollbar>
        <List disablePadding>
          <Items>
            {routes.map((category, index) => (
              <React.Fragment key={index}>
                {category.header ? (
                  <SidebarSection>{category.header}</SidebarSection>
                ) : null}

                {category.children ? (
                  <React.Fragment key={index}>
                    <SidebarCategory
                      isOpen={!openRoutes[index]}
                      isCollapsable={true}
                      name={category.id}
                      icon={category.icon}
                      button={true}
                      onClick={() => toggle(index)}
                    />

                    <Collapse
                      in={openRoutes[index]}
                      timeout="auto"
                      unmountOnExit
                    >
                      {category.children.map((route, index) => (
                        <SidebarLink
                          key={index}
                          name={route.name}
                          to={getRoute(route.path,currentSelectedProject)}
                          icon={route.icon}
                          badge={route.badge}
                        />
                      ))}
                    </Collapse>
                  </React.Fragment>
                ) : (
                    <SidebarCategory
                      isCollapsable={false}
                      name={category.id}
                      to={getRoute(category.path,currentSelectedProject)}
                      activeClassName="active"
                      component={NavLink}
                      icon={category.icon}
                      exact
                      badge={category.badge}
                    />
                  )}
              </React.Fragment>
            ))}
          </Items>
        </List>
      </Scrollbar>
    </Drawer>
  );
}

export default connect(mapStateToProps)(withRouter(Sidebar));
