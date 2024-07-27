import { SegmentedControl, Text, Title } from "@mantine/core";

export default async function CreateMaterialPage() {
    return (
        <form className="mx-8 my-6">
            <h2 className="mb-4">Create material</h2>

            <p>Material Type</p>
            <SegmentedControl
                data={[
                    {
                        value: "1",
                        label: "Reading",
                    },
                    {
                        value: "2",
                        label: "Homework"
                    },
                    {
                        value: "3",
                        label: "Quiz"
                    }
                ]}
            />
        </form>
    );
}
