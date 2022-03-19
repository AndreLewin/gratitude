import { Text, Timeline } from "@mantine/core";
import { format } from "date-fns";

export default function Updates() {
  return (
    <div className="container">
      <Timeline active={1} reverseActive bulletSize={24} lineWidth={2}>
        <Timeline.Item title="Future feature: search in messages" lineVariant="dashed">
          <Text size="xs" mt={4}>Later</Text>
        </Timeline.Item>

        <Timeline.Item title="Future feature: hide messages with keyword" lineVariant="dashed">
          <Text size="xs" mt={4}>Later</Text>
        </Timeline.Item>

        <Timeline.Item title="Future feature: moderator role" lineVariant="dashed">
          <Text color="dimmed" size="sm">Moderators will be able to see reported messages and turn them private</Text>
          <Text size="xs" mt={4}>Later</Text>
        </Timeline.Item>

        <Timeline.Item title="Future feature: report messages" lineVariant="dashed">
          <Text color="dimmed" size="sm">This will make it easier to handle so many messages to check</Text>
          <Text size="xs" mt={4}>Later</Text>
        </Timeline.Item>

        <Timeline.Item title="Future feature: hide messages from user" lineVariant="dashed">
          <Text color="dimmed" size="sm">This will give you more control over what you see in the global page</Text>
          <Text size="xs" mt={4}>Later</Text>
        </Timeline.Item>

        <Timeline.Item title="Public release">
          <Text color="dimmed" size="sm">The application has been made public</Text>
          <Text size="xs" mt={4}>Date to determine</Text>
        </Timeline.Item>

        <Timeline.Item title="Development">
          <Text color="dimmed" size="sm">The gratitude application is being made</Text>
          <Text size="xs" mt={4}>{format(new Date(), "PP")}</Text>
        </Timeline.Item>
      </Timeline>

      <style jsx>
        {`
          .container {
            padding: 20px;            
          }
        `}
      </style>
    </div>
  )
}