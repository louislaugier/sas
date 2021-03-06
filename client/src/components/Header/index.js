import React from "react"
import {Cookies} from "react-cookie"
import axios from "axios"
import {makeStyles} from "@material-ui/core/styles"
import {Link} from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import CartIcon from "@material-ui/icons/ShoppingCart"
import Menu from "@material-ui/core/Menu"
import MenuIcon from "@material-ui/icons/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import UserIcon from "@material-ui/icons/AccountCircle"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import HomeIcon from "@material-ui/icons/Home"
import Divider from "@material-ui/core/Divider"
import AuctionIcon from "@material-ui/icons/Gavel"
import ContactIcon from "@material-ui/icons/Email"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import Collapse from "@material-ui/core/Collapse"
import HelpIcon from "@material-ui/icons/Help"
import MoreIcon from "@material-ui/icons/MoreVert"
import LoginIcon from "@material-ui/icons/ExitToApp"
import SignupIcon from "@material-ui/icons/AssignmentInd"
import Fade from "@material-ui/core/Fade"
import ScrollTopIcon from "@material-ui/icons/KeyboardArrowUp"
import LogoutIcon from "@material-ui/icons/PowerSettingsNew"
import AddressIcon from "@material-ui/icons/ContactMail"
import BidsIcon from "@material-ui/icons/CallMade"
import OrdersIcon from "@material-ui/icons/Assignment"
import WatchlistIcon from "@material-ui/icons/Visibility"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  siteTitle: {
    "font-size": "1.375rem",
    "text-transform": "unset"
  },
  homeTopLeft: {
    display: "flex",
    "align-items": "center"
  },
  flexbar: {
    display: "flex",
    "justify-content": "space-between"
  },
  searchBar: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  list: {
    width: 250,
  },
  nested: {
    paddingLeft: theme.spacing(6)
  },
  nested2Text: {
    paddingLeft: theme.spacing(8)
  },
  nestedCateg: {
    paddingLeft: 0
  }
}))

export default function Header(props) {
  const [scrollTopOpacity, setScrollTopOpacity] = React.useState(0)
  const [scrollTopCursor, setScrollTopCursor] = React.useState("default")
  document.onscroll = function(){
    if (window.pageYOffset > 0){
      setScrollTopOpacity(1)
      setScrollTopCursor("pointer")
    } else {
      window.scrollTo({top: 0, behavior: "smooth"})
      setScrollTopOpacity(0)
      setScrollTopCursor("default")
    }
  }
  const [menuState, setMenuState] = React.useState({
    left: false
  })
  const toggleMenu = (anchor, open) => () => {
    setMenuState({ ...menuState, [anchor]: open })
  }
  const [myAccountNestState, setMyAccountNestState] = React.useState(false)
  const handleMyAccountNestClick = () => {
    setMyAccountNestState(!myAccountNestState)
  }
  const [categoriesMenuNestState, setCategoriesMenuNestState] = React.useState(false)
  const handleCategoriesNestClick = () => {
    setCategoriesMenuNestState(!categoriesMenuNestState)
  }
  const subCategoriesNests = {}
  if (props.categoriesState != null) {
    props.categoriesState.forEach((c, i) => {
      subCategoriesNests.i = false
    })
  }
  const [categoryNestState, setCategoryNestState] = React.useState(subCategoriesNests)
  const handleCategoryNestClick = (i) => async () => {
    if (!categoryNestState[i + 1]) {
      props.handleCategoryChange(null, i + 1)
    }
    setCategoryNestState({...categoryNestState, [i + 1]: !categoryNestState[i + 1]})
  }
  const handleSubCategoryClick = (i) => () => {
    setMenuState({ ...menuState, left: false })
    props.handleSubCategoryChange(null, i + 1)
  }
  const [accountButtonState, setAccountButtonState] = React.useState(null)
  const handleProfileClick = (event) => {
    setAccountButtonState(event.currentTarget)
  }
  const handleProfileClose = () => {
    setAccountButtonState(null)
  }
  const [moreButtonState, setMoreButtonState] = React.useState(null)
  const handleMoreClick = (event) => {
    setMoreButtonState(event.currentTarget)
  }
  const handleMoreClose = () => {
    setMoreButtonState(null)
  }
  const classes = useStyles()
  const list = () => (
    <div
      className={classes.list}
      role="presentation"
    >
      <List>
        <Link to="/">
          <ListItem onClick={update} button>
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText primary="Home"/>
          </ListItem>
        </Link>
        <Link onClick={() => {
          setMenuState({ ...menuState, left: false })
        }} to="/auctions">
          <ListItem button>
            <ListItemIcon><AuctionIcon/></ListItemIcon>
            <ListItemText primary="Auctions"/>
          </ListItem>
        </Link>
        <Link onClick={() => {
          setMenuState({ ...menuState, left: false })
        }} to="/cart">
          <ListItem button>
            <ListItemIcon><CartIcon/></ListItemIcon>
            <ListItemText primary="Cart"/>
          </ListItem>
        </Link>
        <ListItem onClick={handleMyAccountNestClick} button>
          <ListItemIcon><UserIcon/></ListItemIcon>
          <ListItemText primary="Account"/>
          {myAccountNestState ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={myAccountNestState} timeout="auto" unmountOnExit>
          {sessionToken === undefined ? <>
            <List component="div" disablePadding>
              <Link onClick={() => {
                setMenuState({ ...menuState, left: false })
              }} to="/login">
                <ListItem button className={classes.nested}>
                  <ListItemIcon><LoginIcon/></ListItemIcon>
                  <ListItemText primary="Login"/>
                </ListItem>
              </Link>
              <Link onClick={() => {
                setMenuState({ ...menuState, left: false })
              }} to="/signup">
                <ListItem button className={classes.nested}>
                  <ListItemIcon><SignupIcon/></ListItemIcon>
                  <ListItemText primary="Sign up"/>
                </ListItem>
              </Link>
            </List>
          </> : <>
            <List component="div" disablePadding>
              <Link onClick={() => {
                setMenuState({ ...menuState, left: false })
              }} to="/orders">
                <ListItem button className={classes.nested}>
                  <ListItemIcon><OrdersIcon/></ListItemIcon>
                  <ListItemText primary="Orders"/>
                </ListItem>
              </Link>
              <Link onClick={() => {
                setMenuState({ ...menuState, left: false })
              }} to="/addresses">
                <ListItem button className={classes.nested}>
                  <ListItemIcon><AddressIcon/></ListItemIcon>
                  <ListItemText primary="Addresses"/>
                </ListItem>
              </Link>
              <Divider/>
              <Link onClick={() => {
                setMenuState({ ...menuState, left: false })
              }} to="/bids">
                <ListItem button className={classes.nested}>
                  <ListItemIcon><BidsIcon/></ListItemIcon>
                  <ListItemText primary="Bids"/>
                </ListItem>
              </Link>
              <Link onClick={() => {
                setMenuState({ ...menuState, left: false })
              }} to="/watchlist">
                <ListItem button className={classes.nested}>
                  <ListItemIcon><WatchlistIcon/></ListItemIcon>
                  <ListItemText primary="Watchlist"/>
                </ListItem>
              </Link>
              <Divider/>
              <Link onClick={() => {
                setMenuState({ ...menuState, left: false })
              }} to="/logout">
                <ListItem button className={classes.nested}>
                  <ListItemIcon><LogoutIcon/></ListItemIcon>
                  <ListItemText primary="Logout"/>
                </ListItem>
              </Link>
            </List>
          </>}
        </Collapse>
        <Link onClick={() => {
          setMenuState({ ...menuState, left: false })
        }} to="/contact">
          <ListItem button>
            <ListItemIcon><ContactIcon/></ListItemIcon>
            <ListItemText primary="Contact"/>
          </ListItem>
        </Link>
      </List>
      <Divider/>
      <List>
        <ListItem onClick={handleCategoriesNestClick} button>
          <ListItemText className="Menu-Categories" primary="Categories"/>
          {categoriesMenuNestState ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
      </List>
      <Divider/>
      <Collapse in={categoriesMenuNestState} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            props.categoriesState !== null ? props.categoriesState.map((category, i) => (
              <div key={i + 1}>
                <ListItem onClick={handleCategoryNestClick(i)} button className={classes.nested}>
                  <ListItemText primary={category.title}/>
                  {categoryNestState[i + 1] ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={categoryNestState[i + 1]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {
                      props.subCategoriesState !== null && props.subCategoriesState[i + 1] !== undefined ? props.subCategoriesState[i + 1].map((subCategory, j) => (
                        <ListItem key={j + 1} onClick={handleSubCategoryClick(j)} button className={classes.nestedChange2}>
                          <ListItemText className={classes.nested2Text} primary={subCategory.title}/>
                        </ListItem>
                      )) : <></>
                    }
                  </List>
                </Collapse>
              </div>
            )) : <></>
          }
        </List>
      </Collapse>
    </div>
  )
  const update = async () => {
    if (props.initialSlides !== null) {
      await props.setScrollState({
        items: props.initialSlides.all,
        hasMore: true,
        part: 1
      })
    }
    window.scrollTo({top: 0, behavior: "smooth"})
    setMenuState({ ...menuState, left: false })
    if (props.categoriesState !== null) {
      let len = props.categoriesState.length
      for (let i = 0; i < len; i++) {
        if (categoryNestState[i]) {
          setCategoryNestState({...categoryNestState, [i]: !categoryNestState[i]})
        }
      }
    }
    props.setSelectedTab(0)
    props.setSelectedSubTab({
      barStyle: {
        opacity: 0,
        zIndex: -1,
        position: "absolute"
      },
      tab: 0
    })
    props.setSubCategoriesState({
      ...props.subCategoriesState,
      count: 0,
      current: ""
    })
    let result = await axios(props.endpoint + "/slides/count")
    props.setSlidesCountState(result.data.data)
    result = await axios(props.endpoint + "/slides/categories?is_subcategory=false")
    props.setCategoriesState(result.data.data)
    result = await axios(props.endpoint + "/slides?limit=56&orderby=created_at&order=desc")
    props.setScrollState({
      items: result.data.data,
      hasMore: true,
      part: 1
    })
    props.setInitialSlides({
      all: result.data.data
    })
  }
  const sessionToken = new Cookies().get("slidesaeroservice-session")
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.flexbar}>
            <div className={classes.homeTopLeft}>
              <IconButton
                onClick={toggleMenu("left", !menuState["left"])}
                onKeyDown={toggleMenu("left", false)}
                aria-label="menu"
                color="inherit"
              >
                <MenuIcon/>
              </IconButton>
              <Link to="/">
                <Button onClick={update} className={classes.siteTitle} color="inherit">
                  SlidesAeroService
                </Button>
              </Link>
            </div>
            <Paper component="form" className={classes.searchBar}>
              <InputBase
                className={classes.input}
                placeholder="Search for a slide, category or subcategory"
                inputProps={{
                  "aria-label": "search for a slide, (sub)category or registration",
                }}
            />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon/>
              </IconButton>
            </Paper>
            <div>
              <Link to="/cart">
                <IconButton onClick={() => {
                  props.setActiveCartStep(0)
                }} aria-label="cart" color="inherit">
                  <CartIcon/>
                </IconButton>
              </Link>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleProfileClick}
                color="inherit"
                aria-label="account"
              >
                {sessionToken === undefined ? <MoreIcon/> : <UserIcon/>}
                
              </IconButton>
              {sessionToken === undefined ? <>
                <Menu
                  id="profile-menu"
                  anchorEl={accountButtonState}
                  keepMounted
                  open={Boolean(accountButtonState)}
                  onClose={handleProfileClose}
                  TransitionComponent={Fade}
                >
                  <Link to="/login">
                    <MenuItem onClick={handleProfileClose}>Login</MenuItem>
                  </Link>
                  <Link to="/signup">
                    <MenuItem onClick={handleProfileClose}>Sign up</MenuItem>
                  </Link>
                </Menu>
                </> : <>
                  <Menu
                    id="profile-menu"
                    anchorEl={accountButtonState}
                    keepMounted
                    open={Boolean(accountButtonState)}
                    onClose={handleProfileClose}
                    TransitionComponent={Fade}
                  >
                    <Link to="/orders">
                      <MenuItem onClick={handleProfileClose}>Orders</MenuItem>
                    </Link>
                    <Link to="/addresses">
                      <MenuItem onClick={handleProfileClose}>Addresses</MenuItem>
                    </Link>
                    <Divider/>
                    <Link to="/bids">
                      <MenuItem onClick={handleProfileClose}>Bids</MenuItem>
                    </Link>
                    <Link to="/watchlist">
                      <MenuItem onClick={handleProfileClose}>Watchlist</MenuItem>
                    </Link>
                    <Divider/>
                    <Link to="/">
                      <MenuItem onClick={() => {
                        handleProfileClose()
                        // cookie.remove("sas-session") + sas cart
                        // await session delete
                      }}>Logout</MenuItem>
                    </Link>
                  </Menu>
                </>
                
              
              }
              <IconButton
                aria-controls="more"
                aria-haspopup="true"
                onClick={handleMoreClick}
                color="inherit"
                aria-label="more"
              >
                <HelpIcon/>
              </IconButton>
              <Menu
                id="more-menu"
                anchorEl={moreButtonState}
                keepMounted
                open={Boolean(moreButtonState)}
                onClose={handleMoreClose}
                TransitionComponent={Fade}
              >
                <Link to="/about">
                  <MenuItem onClick={handleMoreClose}>About</MenuItem>
                </Link>
                <Divider/>
                <Link to="/terms">
                  <MenuItem onClick={handleMoreClose}>Terms of use</MenuItem>
                </Link>
                <Link to="/privacy">
                  <MenuItem onClick={handleMoreClose}>Privacy policy</MenuItem>
                </Link>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={menuState["left"]}
          onClose={toggleMenu("left", false)}
        >
          {list("left")}
        </Drawer>
      </div>
      <div style={{
        opacity: scrollTopOpacity
      }} onClick={() => {
        window.scrollTo({top: 0, behavior: "smooth"})
      }} className="Scroll-Top">
        <IconButton
          aria-label="scroll-top"
          style={{
            cursor: scrollTopCursor
          }}
        >
          <ScrollTopIcon/>
        </IconButton>
      </div>
    </>
  )
}
