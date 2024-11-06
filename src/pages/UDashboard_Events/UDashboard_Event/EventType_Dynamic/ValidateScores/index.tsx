import { FunctionComponent, useEffect } from "react";
import { useScore } from "../../../../../providers/Scores";
import { useParams } from "react-router-dom";
import ScoreValidationCard from "../../../../../components/ScoreValidationCard";
import { Table } from "../../../../../styles/global";

interface UValidateScoresProps {
    
}
 
const UValidateScores: FunctionComponent<UValidateScoresProps> = () => {
    
    const { event_id } = useParams()

    const { getPendingScoresByEvent, pendingScores, scoreRefreshTrigger } = useScore()

    useEffect(() => {
        getPendingScoresByEvent(Number(event_id))
    }, [])

    useEffect(() => {
        getPendingScoresByEvent(Number(event_id))
    }, [scoreRefreshTrigger])

    const sortedScoresByDate = pendingScores.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

    return ( 
        <>
         <Table>
            <tbody>
                {sortedScoresByDate && sortedScoresByDate.map((score) => (
                    <tr key={score.score_id}>
                        <ScoreValidationCard score={score} />
                    </tr>
                ))}
            </tbody>
         </Table>
        </>

    );
}
 
export default UValidateScores;