import JoinModal from '@/app/(Logined)/search/_components/joinModal';

export default async function Page({ params }: { params: { id: number } }) {
    const id = Number(
        Array.isArray(params?.id)
          ? params?.id[0]
          : params?.id,
    )

    return (
        <>
            인터셉팅..!
            <JoinModal id={id}/>
        </>
    )
}