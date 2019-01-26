import { useReducer } from "react"
import update from "react-addons-update"
import {compose,forEach,toPairs} from 'ramda'
import useViewportW from "./useViewportWListener";

const useNavReducer=({ activeLinkKey })=>{
  const reducer = (state, action) => {
    switch (action.type) {
      case "activateLink":{
        const {key}=action
        return update(state, { activeKey:{$set:key}} )
      }
      case "toggleMenu":{
        const {key}=action
        const {isToggleOff}=state.menues[key]
        return update(state,{menues:{[key]:{isToggleOff:{$set:isToggleOff}}}})
      } 
      case "setViewportW":{
        const {viewportW}=action
        return update(state,{viewportW:{$set:viewportW}})
      }
    
      default:
        return state
    }
  }
  const initState={menus:{}}
  const initAction={
    type:'activateKey',
    key:activeLinkKey
  }

  const initResponsiveToggledMenu=({key,parentMenuKey})=>{
    if(state.menues[key])return
    const menuState={parentMenuKey,toggled:false,children:{menues:[],links:[]}}
    state.menues[key]=menuState
  }
  const addChildToMenu=(typeOfChild,{childKey,parentMenuKey})=>{
    const children=state.menues[parentMenuKey].children[typeOfChild]
    !children.contains(childKey) && children.push(childKey)
  }
  const addMenuToMenu=(props)=>addChildToMenu('menues',props)
  const addLinkToMenu=(props)=>addChildToMenu('links',props)
  const isMenuActive=(key)=>{
    const {children:{menues,links}}=state.menues[key]
    const {activeLinkKey}=state
    return links.find((key)=>(key===activeLinkKey)) || menues.find((key)=>isMenuActive(key))
  }

  const initMenuToggle=({key,bp,targetMenuKey})=>{
    if(state.menues[key])return
    const menuState={parentMenuKey,show:false}
    state.menues[key]=menuState
    return menuState
  }
  const [state,dispatch]=useReducer(reducer,initState,initAction)
  return [state,dispatch,{initMenu,addMenuToMenu,addLinkToMenu,isMenuActive}]
}

const useNav = ({ activeLinkKey }) => {
  const [state,dispatch,{initToggledMenuState,addMenuToMenu,addLinkToMenu,isMenuActive}]=useNavReducer(reducer,initState,initAction)
  useViewportWListener(
    (viewportW)=>dispatch({type:'setViweportW',viewportW})
  )
  const getCssProps={viewportW:state.viewportW}

  const linkProps = ({ to, key=to,ref, getCss=()=>{},isDisabled, parentMenuKey,...props }) => {
    const isActive=key===state.activeLinkKey
    const linkCss=getCss({...getCssProps,isActive,isDisabled,key,component:'nav.link'})
    const linkProps = { ...props, css:linkCss, to,key}
    if(parentMenuKey)addLinkToMenu({parentMenuKey,childKey:key})
    const setActiveLink = () => {(!isDisabled && !isActive) && dispatch({type:'activateLink',key})}
    if (ref) {
        ref.current.addEventListener("click", setActiveLink)
        return {...linkProps,linkRef:ref}
    }
    return { ...linkProps, onClick:setActiveLink,key }
  }

  const responsiveToggledMenu=({key,bp=0})=>{
    const {isActive,isToggledOff}=initResponsiveToggledMenuState(key)
    const isBelowBp=state.viewportW<bp
    const menuProps=({parentMenuKey,getCss,...props})=>{
      if(parentMenuKey)addMenuToMenu({parentMenuKey,childKey:key})
      const menuCss=getCss({isBelowBp,isToggledOff,key,...getCssProps,
        component:'responsiveToggledMenu.menu',
        isActive:isActive()
      })
      return {key,css:menuCss,...props} 
    }
    const toggleProps=({getCss,ref,...props})=>{
      const toggle=()=>dispatch({type:'toggleMenu',key})
      const toggleProps={...props,state,dispatch,
        css:getCss({isBelowBp,isToggledOff,key,...getCssProps,
          component:'responsiveToggledMenu.toggle',
          isActive:isActive()
        })
      }
      if (ref) {
        ref.current.addEventListener("click", toggle)
        return {...toggleProps,linkRef:ref}
      }
      return { ...toggleProps, onClick:toggle,key }
      }
    }
    return {menuProps,toggleProps}
  }
  
  
  return { linkProps, responsiveToggledMenu,state,dispatch }
}
export default useNav
