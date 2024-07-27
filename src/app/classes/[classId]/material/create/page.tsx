import { SegmentedControl, Text } from "@mantine/core";

export default async function CreateMaterialPage() {
    return (
        <div>
            <Text size="sm" fw={500} mb={3}>
                Disabled option
            </Text>
            <SegmentedControl data={[]} />
        </div>
    );
}
