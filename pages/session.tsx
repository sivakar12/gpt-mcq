import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import QuestionAndAnswers from '../components/QuestionAndAnswers'
import { MCQ } from '../types/MCQ'


const Container = styled.div`
    display: flex;
    max-width: 800px;
    margin: auto;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding: ${props => props.theme.space[2]};
    space-between: ${props => props.theme.space[0]};
    `
const Subject = styled.div`
    align-self: center;
    margin: ${props => props.theme.space[2]};
    font-size: ${props => props.theme.fontSizes[0]};
`

const Loading = styled.div`
    align-self: center;
    font-size: ${props => props.theme.fontSizes[3]};
`

const Button = styled.div`
    margin: ${props => props.theme.space[2]};
    padding: ${props => props.theme.space[2]};
    font-size: ${props => props.theme.fontSizes[3]};
    background-color: ${props => props.theme.colorPalette.background2};
    // disable text selection
    user-select: none; /* Standard syntax */
`

const ButtonRow = styled.div`
    align-self: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: ${props => props.theme.space[2]};
    space-between: ${props => props.theme.space[0]};
`

const dummyData: MCQ[] = [
    {
        question: 'What is the capital of France?',
        answers: ['Paris', 'London', 'Berlin', 'Rome'],
        correctAnswer: 0
    },
    {
        question: 'What is the capital of Germany?',
        answers: ['Berlin', 'London', 'Paris', 'Rome'],
        correctAnswer: 0
    },
    {
        question: 'What is the capital of Italy?',
        answers: ['Rome', 'London', 'Berlin', 'Paris'],
        correctAnswer: 0
    },
]

export default function MCQSession() {
    const router = useRouter()
    const subject = router.query.subject
    const [difficulty, setDifficulty] = useState(5)

    const [mcqItems, setMcqItems] = useState<MCQ[]>([] as MCQ[])
    const [index, setIndex] = useState(0 as number)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false as boolean)

    const loadGeneratedQuestions =  async () => {
        setIsLoading(true)
        const response = await fetch(`api/generate?subject=${subject}&difficulty=${difficulty}`)
        const data = await response.json()
        setMcqItems(data)
        setIndex(0)
        setSelectedIndex(null)
        setIsLoading(false)
    }
    useEffect( () => {
        if (mcqItems.length === 0) {
            loadGeneratedQuestions()
        } else if (index == mcqItems.length - 1) {
            loadGeneratedQuestions()
        }

    }, [selectedIndex, mcqItems, index])


    const handleNext = () => {
        if (index < mcqItems.length - 1) {
            setIndex(index + 1)
            setSelectedIndex(null)
        }
    }

    const handlePrevious = () => {
        if (index > 0) {
            setIndex(index - 1)
            setSelectedIndex(null)
        }
    }

    const resetForDifficultyChange = () => {
        setMcqItems([])
        setIndex(0)
        setSelectedIndex(null)
    }

    const handleEasier = () => {
        if (difficulty > 1) {
            setDifficulty(difficulty - 1)
            resetForDifficultyChange()
        }
    }

    const handleHarder = () => {
        if (difficulty < 10) {
            setDifficulty(difficulty + 1)
            resetForDifficultyChange()
        }
    }

    const loadingMessage = index === 0 ? 'Loading questions...' : 'Loading more questions...'
    return (
        <Container>
            <Subject>{router.query.subject}</Subject>
            {isLoading && <Loading>{loadingMessage}</Loading>}
            {mcqItems.length !== 0 && <QuestionAndAnswers 
                mcqItem={mcqItems[index]} 
                selectedIndex={selectedIndex} 
                onAnswerSelected={(index) => setSelectedIndex(index)}
                />}
            <ButtonRow>
                {/* <Button onClick={handlePrevious}>Previous</Button> */}
                <Button onClick={handleEasier}>Easier Questions</Button>
                <Button onClick={handleHarder}>Harder Questions</Button>
                <Button onClick={handleNext}>Next</Button>
            </ButtonRow>
        </Container>
    )
}
