import{j as e}from"./jsx-runtime-PJfywvQB.js";import{r as x}from"./index-tnPESBdE.js";import{u as d}from"./fuse.esm-DpGxg_dX.js";import"./index-C4WGByT4.js";import"./parchmentTheme-CF6Ki9yW.js";import{f as L,g as t,h as s,i as o,j as k,M as h,k as j,l as g}from"./useShowToast-CjhSvX3m.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";import"./inheritsLoose-XbxvykFZ.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./index-DwWHXmyK.js";import"./useCombinedRefs-G3-tKQwR.js";import"./index-CNLxx85X.js";const R={title:"core-ui/List"},i=()=>{const[r,a,p]=d(!1),[u,I]=x.useState("Im editable"),n=[{displayText:"Delete",icon:"trash"},{displayText:"Rename",icon:"edit"}];return e.jsxs(L,{children:[e.jsxs(t,{onClick:()=>console.log("bread :p"),children:[e.jsx(s,{icon:"bold"}),e.jsx(o,{text:"Bread"}),e.jsx(s,{icon:"tick"})]}),e.jsxs(t,{onClick:()=>console.log("milk :p"),children:[e.jsx(s,{icon:"database"}),e.jsx(o,{text:"Milk"})]}),e.jsxs(t,{contextMenuItems:n,onClick:()=>console.log("cheese :p"),children:[e.jsx(s,{icon:"blank"}),e.jsx(o,{text:"Cheese"}),e.jsx(k,{children:e.jsx(h,{items:n,isOpen:r,onClose:p,children:e.jsx(j,{icon:"menu",onClick:a})})})]}),e.jsxs(t,{onClick:()=>console.log("???"),children:[e.jsx(s,{icon:"blank"}),e.jsx(o,{text:"Super duper duper duper duper duper duper long"})]}),e.jsx(t,{children:e.jsx(g,{value:u,onChange:I})}),e.jsxs(t,{onClick:()=>console.log("image icon!"),children:[e.jsx(s,{icon:{kind:"image",src:"https://picsum.photos/75/100"}}),e.jsx(o,{text:"Image icon!"})]})]})};i.__docgenInfo={description:"",methods:[],displayName:"Primary"};var c,m,l;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const [isMenuOpen, openMenu, closeMenu] = useBooleanState(false);
  const [input, setInput] = useState('Im editable');
  const menuItems: MenuItem[] = [{
    displayText: 'Delete',
    icon: 'trash'
  }, {
    displayText: 'Rename',
    icon: 'edit'
  }];
  return <List>
            <ListItem onClick={() => console.log('bread :p')}>
                <ListItemIcon icon="bold" />
                <ListItemText text="Bread" />
                <ListItemIcon icon="tick" />
            </ListItem>
            <ListItem onClick={() => console.log('milk :p')}>
                <ListItemIcon icon="database" />
                <ListItemText text="Milk" />
            </ListItem>
            <ListItem contextMenuItems={menuItems} onClick={() => console.log('cheese :p')}>
                <ListItemIcon icon="blank" />
                <ListItemText text="Cheese" />
                <ListItemShallowClickArea>
                    <MenuPopover items={menuItems} isOpen={isMenuOpen} onClose={closeMenu}>
                        <ListItemIconButton icon="menu" onClick={openMenu} />
                    </MenuPopover>
                </ListItemShallowClickArea>
            </ListItem>
            <ListItem onClick={() => console.log('???')}>
                <ListItemIcon icon="blank" />
                <ListItemText text="Super duper duper duper duper duper duper long" />
            </ListItem>
            <ListItem>
                <ListItemInput value={input} onChange={setInput} />
            </ListItem>
            <ListItem onClick={() => console.log('image icon!')}>
                <ListItemIcon icon={{
        kind: 'image',
        src: 'https://picsum.photos/75/100'
      }} />
                <ListItemText text="Image icon!" />
            </ListItem>
        </List>;
}`,...(l=(m=i.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};export{i as Primary,R as default};
