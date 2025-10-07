export default function ScrollDown() {
    return (
        <div style={{height: '200px', overflowY: 'scroll', border: '1px solid #css', padding: '10px'}}>
            {[...Array(30)].map((_,i)=> (
                <p key={i}>Dòng {i+1}</p>
            ))}
        </div>
    )
}