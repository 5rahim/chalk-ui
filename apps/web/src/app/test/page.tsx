import { ClientTest } from "./ClientTest"

export default async function Page({ params: { lng } }: { params: { lng: string } }) {
   
   return (
      <div className="container max-w-2xl">
         <ClientTest />
      </div>
   )
}
