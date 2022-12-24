import React from 'react'
import styled from 'styled-components'
import { MCQ } from '../types/MCQ'

const Question =  styled.div`
    margin: ${props => props.theme.space[2]};
    padding: ${props => props.theme.space[2]};
    font-size: ${props => props.theme.fontSizes[2]};
`
const Answer = styled.div`
    margin: ${props => props.theme.space[2]};
    padding: ${props => props.theme.space[2]};
    margin-left: ${props => props.theme.space[0]};
    font-size: ${props => props.theme.fontSizes[2]};
    background-color: ${props => {
        switch (props.color) {
            case 'text':
                return props.theme.colorPalette.background2
            case 'error':
                return props.theme.colorPalette.answerError || 'red'
            case 'success':
                return props.theme.colorPalette.answerSuccess || 'green'
        }
    }};
`

const AnswerIndex = styled.div`
    display: inline-block;
    // background-color: ${props => props.theme.colorPalette.background2};
    aspect-ratio: 1/1;
`
type Props = {
    mcqItem: MCQ,
    selectedIndex: number | null,
    onAnswerSelected: (index: number) => void
}
export default function QuestionAndAnswers({ mcqItem, selectedIndex, onAnswerSelected }: Props) {
    const { question, answers } = mcqItem

    const answered = selectedIndex !== null

    const answerColors = answers.map((_, index) => {
        if (!answered) {
            return 'text'
        }
        if (index === selectedIndex && index === mcqItem.correctAnswer) {
            return 'success'
        }
        if (index === selectedIndex && index !== mcqItem.correctAnswer) {
            return 'error'
        }
        if (index === mcqItem.correctAnswer) {
            return 'success'
        }
        return 'text'
    })

    const handleClick = (index: number) => {
        if (!answered) {
            onAnswerSelected(index)
        }
    }
    return (
        <>
            <Question>{question}</Question>
            {answers.map((answer, index) => {
                return (
                    <Answer 
                        key={index}
                        onClick={() => handleClick(index)}
                        color={answerColors[index]}
                        >
                        <AnswerIndex>{index + 1}</AnswerIndex> {answer}
                    </Answer>
                )
            })}
        </>
    )
}