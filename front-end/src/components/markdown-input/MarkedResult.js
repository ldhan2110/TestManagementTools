import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'
import './LineBreak.css'

const Container = styled.div`
    width: 100%;
    
`;

const ResultArea = styled.div`
    border: 1px solid rgba(15, 15, 15, 0.3);
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    resize: vertical;
    min-height: 100px;
`;

const components = {
    img({node, ...props}) {
        const source = props.src;
        return(
            <a href={source} target="_blank" contentEditable="false">
                <img style={{maxWidth:'140px', maxHeight:'140px' }} align="bottom" {...props} />
            </a>
        )
    }
  }
  

export default function MarkedResult(props){

    const { markdown, height } = props;

    return <Container>
        <ResultArea style={height ? {height: height}:{}} contentEditable="false">
            <ReactMarkdown children={markdown} remarkPlugins={[gfm]} className="react-mark-down-line-break-result"
            components={components}
            />
        </ResultArea>
    </Container>
}