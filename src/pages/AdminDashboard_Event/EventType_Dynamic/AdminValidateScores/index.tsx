import { FunctionComponent, useEffect } from "react";
import { useScore } from "../../../../providers/Scores";
import { useParams } from "react-router-dom";
import ScoreValidationCard from "../../../../components/ScoreValidationCard";
import { Table } from "../../../../styles/global";

interface AdminValidateScoresProps {
    
}
 
const AdminValidateScores: FunctionComponent<AdminValidateScoresProps> = () => {
    
    // TODO:

    // create a function inside scores context that brings all the 
    // unvalidated scores submited to this dynamic event

    // render for each score all the score data

    // render two buttons

    // validate (v)
    //   this will call a function that patches the scores
    //   changing the validated status to true

    // invalidate (x)
    //    this will call a function that will delete the score
    //    and remove its uploaded picture from the bucket (server side)

    const { event_id } = useParams()

    const { getPendingScoresByEvent, pendingScores } = useScore()

    useEffect(() => {
        getPendingScoresByEvent(Number(event_id))
    }, [])

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
 
export default AdminValidateScores;