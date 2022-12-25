import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'

const EXAMPLE_SUBJECTS = [
    'Statistics',
    'Neuroscience',
    'JavaScript',
    'React.js',
    'Algorithms',
    'Data Science',
    'Dermatology',
    'Astrophysics',
    'Renaissance History',
    'Western Classical Music',
]

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${props => props.theme.space[2]};
    space-between: ${props => props.theme.space[0]};
`

const Instruction = styled.div`
    margin: ${props => props.theme.space[2]};
    font-size: ${props => props.theme.fontSizes[2]};
`

const Input = styled.input`
    font-size: ${props => props.theme.fontSizes[0]};
    margin: ${props => props.theme.space[2]};
    padding: ${props => props.theme.space[1]};
    background-color: ${props => props.theme.colorPalette.background2};
    color: ${props => props.theme.colorPalette.text};
    text-align: center;
`

const ExmapleList = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 800px;
    flex-wrap: wrap;
    justify-content: center;
`

const Example = styled.div`
    margin: ${props => props.theme.space[2]};
    padding: ${props => props.theme.space[2]};
    font-size: ${props => props.theme.fontSizes[1]};
    background-color: ${props => props.theme.colorPalette.background2};
    color: ${props => props.theme.colorPalette.text};
    text-align: center;
`

const GenerateButton = styled.div`
    cursor: pointer;
    outline: none;
    margin: ${props => props.theme.space[1]};
    padding: ${props => props.theme.space[1]};
    border-radius: ${props => props.theme.borderRadius};
    font-size: ${props => props.theme.fontSizes[1]};
    background-color: ${props => props.theme.colorPalette.text};
    color: ${props => props.theme.colorPalette.background};
`

export default function ChooseSubject() {
    const [subject, setSubject] = useState('' as string)
    const [showExamples, setShowExamples] = useState(false as boolean)

    const router = useRouter()
    const handleGenerate = () => {
        if (!subject) return
        router.push(`/session?subject=${subject}`)
    }
    return (
        <Container>
            <Instruction>Type any subject:</Instruction>
            {/* Make an input field to set subject */}
            <Input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
            />
            <GenerateButton onClick={handleGenerate}>Generate questions</GenerateButton>
            { !showExamples && <Instruction onClick={() => setShowExamples(true)}>Show Examples</Instruction> }
            { showExamples &&  
            <>
                <Instruction>Or pick a subject from examples:</Instruction>
                <ExmapleList>
                    {EXAMPLE_SUBJECTS.map(subject => (
                        <Example key={subject} onClick={() => setSubject(subject)}>{subject}</Example>
                    ))}
                </ExmapleList>
            </>
            }
        </Container>
    );
}