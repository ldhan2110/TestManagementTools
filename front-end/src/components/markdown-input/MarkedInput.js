import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    Grid,
    Tooltip, Typography
  } from '@material-ui/core';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import ReactMarkdown from 'react-markdown';
import Editor from 'react-markdown-editor-lite';
import gfm from 'remark-gfm'
import InsertImage from './insertImage'
import './index.css'; // Required for the editor to display properly
import './LineBreak.css'


const Container = styled.div`
    width: 100%;
`;

const MarkedInput = (props) => {

    const {handleChange, idOfInput, setTxt, title} = props;
    const editorRef = React.useRef(null);

    const [openInsertImage, setOpenInsertImage] = useState(false);
    const [text, setText] = useState(setTxt ? setTxt : '');

    useEffect(() => {if(setTxt !== undefined || setTxt !== null) setText(setTxt);},[setTxt])
    useEffect(() => {handleChange(text);},[text])

    const insertImage = (img) => {
        if (editorRef.current && (img !== "")) {
            editorRef.current.insertText(`![](${img}) `);}
    }

    const handleAddImage = () => {
        setOpenInsertImage(true);
    }
    
    const plugins=['header','font-bold','font-italic','font-strikethrough','list-unordered',
    'list-ordered','block-quote','block-wrap','block-code-inline','block-code-block','table','link','logger','mode-toggle']

    const pluginsSteps = ['mode-toggle']

    const components = {
        img({node, ...props}) {
            const source = props.src;
            return(
                <a href={source} target="_blank">
                    <img style={{maxWidth:'120px', maxHeight:'120px' }} align="bottom" {...props} />
                </a>
            )
        }
    }

    return (<Container>

        <InsertImage isOpen={openInsertImage} openMethod={setOpenInsertImage} insertImage={insertImage}></InsertImage>
        <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography variant="subtitle2" gutterBottom display="inline" >
                {title}
            </Typography> 
            <Grid item>
                <Tooltip title="Add an image to field" arrow>
                    <PanoramaOutlinedIcon color="primary" onClick={handleAddImage} style={{fontSize:'28px'}}/>
                </Tooltip>
                </Grid>
        </Grid>

        <Editor ref={editorRef} id={idOfInput} value={text}
        style={{ minHeight: '150px', height: '180px', overflowY:'auto', overflowX: 'hidden', resize:'vertical' }} 
        onChange={(text) => {setText(text.text);}} 
        renderHTML={(text) => <ReactMarkdown className="react-mark-down-line-break" remarkPlugins={[[gfm]]} children={text} components={components}/>}
        plugins={(idOfInput === 'expectedResult' || idOfInput.includes("definition") === true) ? pluginsSteps : plugins}
        config={{ 
            view: {html: false}
        }}
        />
        {/* <input id={idOfInput+"-text"} value={text} type="hidden"/> */}
    </Container>)
}

export default (MarkedInput)