import Privacy from "components/Privacy";
import Terms from "components/Terms";

export default function TermsAndPrivacy() {
  return (
    <div className="container">
      <Terms />
      <div style={{ marginTop: `25px` }} />
      <Privacy />

      <style jsx>
        {`
          .container {
            padding: 30px;            
          }
        `}
      </style>
    </div>
  )
}