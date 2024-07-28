"use client";

import { useState, useMemo } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { Button, Container, Modal, Text, Group, Badge } from "@mantine/core";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface HomeworkSubmission {
  id: string;
  userId: string;
  homeworkId: string;
  answers: string; // Updated to string to hold JSON data
  score: string;
  submittedAt: string;
}


const mockHomeworkSubmissions: HomeworkSubmission[] = [
  {
    id: "1",
    userId: "1xe34e",
    homeworkId: "homework1",
    answers: JSON.stringify({
      "What are the five pillars in Islam?": "Shahada, Salah, Zakat, Sawm, and Hajj",
      "How many times do you pray in a day?": "5",
      "What should you say before eating?": "Say Bismillah",
    }),
    score: "10",
    submittedAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "w2xe3d",
    homeworkId: "homework2",
    answers: JSON.stringify({
      "Who is the Last Prophet?": "Muhammad SAW",
      "What is the name of our book?": "Quran",
      "What does Sawm mean?": "Fasting",
    }),
    score: "9",
    submittedAt: new Date().toISOString(),
  },
  {
    id: "3",
    userId: "g25e3f",
    homeworkId: "homework3",
    answers: JSON.stringify({
      "What are the five pillars in Islam?": "Shahada, Salah",
      "How many times do you pray in a day?": "3",
      "What should you say before eating?": "Say Mashallah",
    }),
    score: "8",
    submittedAt: new Date().toISOString(),
  },
  {
    id: "4",
    userId: "sfh34d",
    homeworkId: "homework4",
    answers: JSON.stringify({
      "What are the five pillars in Islam?": "Shahada, Salah, Zakat, Sawm, and Hajj",
      "How many times do you pray in a day?": "5",
      "What should you say before eating?": "Say Bismillah",
    }),
    score: "7",
    submittedAt: new Date().toISOString(),
  },
  {
    id: "5",
    userId: "a31of2d",
    homeworkId: "homework5",
    answers: JSON.stringify({
      "What are the five pillars in Islam?": "Shahada, Salah",
      "How many times do you pray in a day?": "3",
      "What should you say before eating?": "Say Mashallah",
    }),
    score: "6",
    submittedAt: new Date().toISOString(),
  },
  {
    id: "6",
    userId: "a2dphl",
    homeworkId: "homework6",
    answers: JSON.stringify({
      "What are the five pillars in Islam?": "Shahada, Salah, Zakat, Sawm, and Hajj",
      "How many times do you pray in a day?": "5",
      "What should you say before eating?": "Say Bismillah",
    }),
    score: "5",
    submittedAt: new Date().toISOString(),
  },
];

export default function HomeworkPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<HomeworkSubmission | null>(null);
  const [selectedRows, setSelectedRows] = useState<HomeworkSubmission[]>([]);
  const [rowData] = useState<HomeworkSubmission[]>(mockHomeworkSubmissions);

  const columns = useMemo(() => [
    { headerName: "ID", field: "id", width: 100 },
    { headerName: "User ID", field: "userId", width: 150 },
    { headerName: "Homework ID", field: "homeworkId", width: 150 },
    { headerName: "Score", field: "score", width: 100 },
    { headerName: "Submitted At", field: "submittedAt", width: 200 },
    {
      headerName: "Answers",
      field: "answers",
      cellRendererFramework: (params: any) => (
        <Button
          onClick={() => {
            setSelectedSubmission(params.data);
            setModalIsOpen(true);
          }}
          className="mx-auto block"
        >
          View Answers
        </Button>
      ),
      width: 150,
    },
  ], []);

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedSubmission(null);
  };

  const defaultColDef = useMemo(() => ({
    filter: true,
    editable: true,
    resizable: true,
  }), []);

  const handleViewAnswers = () => {
    if (selectedRows.length > 0) {
      setSelectedSubmission(selectedRows[0]);
      setModalIsOpen(true);
    }
  };

  return (
    <Container className="w-[95vw] mx-auto pt-5 flex">
      <div className="ag-theme-quartz h-[600px] w-[75%] border border-gray-300">
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          pagination={true}
          rowSelection="single"
          suppressRowClickSelection={true}
          onRowClicked={(params) => {
            setSelectedRows([params.data]);
          }}
          rowClassRules={{
            "bg-blue-100": (params) => {
              return selectedRows.some(row => row.id === params.data.id);
            }
          }}
        />
      </div>
      <div className="w-[25%] p-5 border-l border-gray-300">
        <Group direction="column" spacing="md">
          <Button
            onClick={handleViewAnswers}
            disabled={selectedRows.length === 0}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            View Answers
          </Button>
        </Group>
      </div>
      <Modal
        opened={modalIsOpen}
        onClose={closeModal}
        title="Submission Details"
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
        classNames={{ modal: 'rounded-lg p-6', title: 'text-xl font-semibold' }}
      >
        {selectedSubmission && (
          <div className="p-5 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <Badge size="md" variant="gradient" gradient={{ from: 'blue', to: 'grape', deg: 90 }}>
                Score: {selectedSubmission.score}
              </Badge>
              <Badge color="orange" variant="light" size="md">
                Submitted At: {new Date(selectedSubmission.submittedAt).toLocaleDateString()}
              </Badge>
            </div>
            <Text weight={500} className="text-lg font-semibold text-gray-700">Answers:</Text>
            {Object.entries(JSON.parse(selectedSubmission.answers)).map(([question, answer]) => (
              <div key={question} className="mb-2">
                <Text weight={500}>{question}</Text>
                <pre className="bg-gray-100 p-2 rounded">{answer}</pre>
              </div>
            ))}
            <div className="flex justify-center">
              <Button onClick={closeModal} className="mt-5 bg-blue-500 text-white hover:bg-blue-600">Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </Container>
  );
}
