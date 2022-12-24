import React from 'react'
import styled from 'styled-components'

const EXAMPLE_SUBJECTS = [
    'Statistics',
    'Neuroscience',
    'Game Theory',
    'JavaScript',
    'Data Science',
    'Dermatology',
    'Astrophysics',
    'Renaissance History'
]

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${props => props.theme.space[0]};
    space-between: ${props => props.theme.space[0]};
`

const Instruction = styled.div`
    margin: ${props => props.theme.space[0]};
    font-size: ${props => props.theme.fontSizes[1]};
`

const Input = styled.input`
    font-size: ${props => props.theme.fontSizes[1]};
    background-color: ${props => props.theme.colorPalette.background2};
    color: ${props => props.theme.colorPalette.text};
    text-align: center;
`



export default function ChooseSubject() {
    const [subject, setSubject] = React.useState('' as string)

    return (
        <Container>
            <Instruction>Choose a Subject:</Instruction>
            {/* Make an input field to set subject */}
            <Input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
            />
            <Instruction>Pick a subject from examples</Instruction>
            <ul>
                {EXAMPLE_SUBJECTS.map(subject => (
                    <li key={subject} onClick={() => setSubject(subject)}>{subject}</li>
                ))}
            </ul>
        </Container>
    );
}