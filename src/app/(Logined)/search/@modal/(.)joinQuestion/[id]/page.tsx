import JoinModal from '@/app/(Logined)/search/_components/joinModal';
import prisma from '@/app/lib/prisma';

export default async function Page({ params }: { params: { id: number } }) {
    const id = Number(
        Array.isArray(params?.id)
          ? params?.id[0]
          : params?.id,
    )

    // const chatRoom = await prisma.chatRoom.findUnique({
    //     where: { id: id },
    //     include: { }
    // })

    return (
        <>
            인터셉팅..!
            <JoinModal id={id}/>
        </>
    )
}