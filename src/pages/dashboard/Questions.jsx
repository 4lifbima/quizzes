import Breadcrumb from "@/components/Breadcrumb";
import { getQuiz } from "@/services/quizService";
import { Button, Card, Modal } from "flowbite-react";
import { useRef, useState } from "react";
import { HiOutlinePrinter, HiOutlineDocumentArrowDown, HiOutlineXMark } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";

export default function Questions() {
  const params = useParams();
  const data = getQuiz(params.id);
  const printRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePreviewPDF = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    const element = printRef.current;

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `Soal-Paket-${+params.idx + 1}-${params.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrintPDF = () => {
    const element = printRef.current;

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `Soal-Paket-${+params.idx + 1}-${params.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).outputPdf('bloburl').then((pdfUrl) => {
      const printWindow = window.open(pdfUrl, '_blank');
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    });
  };

  return (
    <div className="space-y-5">
      <Card className="shadow-none">
        <div className="flex justify-between items-start">
          <div>
            <h5 className="text-2xl font-bold">Paket {+params.idx + 1}</h5>
            <Breadcrumb breadcrumbs={[
              { label: 'Dasbor', href: '/dashboard' },
              { label: 'Riwayat', href: '/dashboard/quiz' },
              { label: params.id, href: `/dashboard/quiz/${params.id}` },
              { label: `Paket ${+params.idx + 1}`, href: null },
            ]} />
          </div>
          <div className="flex gap-2">
            <Button
              color="light"
              size="sm"
              onClick={handlePreviewPDF}
              className="flex items-center gap-2"
            >
              <HiOutlinePrinter className="text-lg" />
              <span className="hidden sm:inline">Preview PDF</span>
            </Button>
            <Button
              color="dark"
              size="sm"
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <HiOutlineDocumentArrowDown className="text-lg" />
              <span className="hidden sm:inline">{isGenerating ? 'Generating...' : 'Download PDF'}</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Questions Display */}
      {data.quiz.questions[params.idx].map((question, idx) => (
        <Card key={idx} className="shadow-none">
          <p className="font-medium">{idx + 1}. {question.text}</p>
          <ul className="ml-4 space-y-1">
            {Object.entries(question.options).map(([key, option]) => (
              <li key={key} className={`${key === question.answer.key ? 'text-green-600 font-medium' : 'text-gray-700'}`}>
                {key}. {option}
              </li>
            ))}
          </ul>
          <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800"><span className="font-semibold">Jawaban:</span> {question.answer.key}</p>
            <p className="text-sm text-green-700 mt-1"><span className="font-semibold">Penjelasan:</span> {question.answer.text}</p>
          </div>
        </Card>
      ))}

      {/* PDF Preview Modal */}
      <Modal show={showPreview} onClose={() => setShowPreview(false)} size="4xl">
        <Modal.Header>
          <div className="flex items-center gap-3">
            <span>Preview PDF - Paket {+params.idx + 1}</span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-white border rounded-lg overflow-auto max-h-[60vh]">
            {/* PDF Content Template */}
            <div ref={printRef} className="p-8 bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
              {/* Header */}
              <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">LEMBAR SOAL</h1>
                <div className="flex justify-center gap-8 text-sm text-gray-600">
                  <span><strong>Jenjang:</strong> {data.quiz.level}</span>
                  <span><strong>Mata Pelajaran:</strong> {data.quiz.subject}</span>
                  <span><strong>Paket:</strong> {+params.idx + 1}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  <strong>Materi:</strong> {data.quiz.topics.join(', ')}
                </div>
              </div>

              {/* Student Info */}
              <div className="mb-6 p-4 border border-gray-300 rounded">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Nama:</strong> _______________________________</div>
                  <div><strong>Kelas:</strong> _______________________________</div>
                  <div><strong>No. Absen:</strong> _______________________________</div>
                  <div><strong>Tanggal:</strong> _______________________________</div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded text-sm">
                <p className="font-semibold mb-1">Petunjuk:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>Tuliskan nama, kelas, dan nomor absen pada tempat yang disediakan.</li>
                  <li>Bacalah setiap soal dengan teliti sebelum menjawab.</li>
                  <li>Pilihlah jawaban yang paling tepat dengan memberi tanda silang (X) pada huruf pilihan.</li>
                </ol>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {data.quiz.questions[params.idx].map((question, idx) => (
                  <div key={idx} className="text-sm">
                    <p className="font-medium mb-2">{idx + 1}. {question.text}</p>
                    <div className="ml-4 space-y-1">
                      {Object.entries(question.options).map(([key, option]) => (
                        <div key={key} className="flex">
                          <span className="w-6">{key}.</span>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Answer Key Section (on new page) */}
              <div className="mt-8 pt-8 border-t-2 border-gray-800">
                <h2 className="text-xl font-bold text-center mb-4">KUNCI JAWABAN</h2>
                <div className="grid grid-cols-5 gap-2 text-sm">
                  {data.quiz.questions[params.idx].map((question, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded text-center">
                      <span className="font-medium">{idx + 1}.</span> {question.answer.key}
                    </div>
                  ))}
                </div>

                {/* Explanations */}
                <div className="mt-6">
                  <h3 className="font-bold mb-3">Pembahasan:</h3>
                  <div className="space-y-3 text-sm">
                    {data.quiz.questions[params.idx].map((question, idx) => (
                      <div key={idx}>
                        <span className="font-medium">{idx + 1}.</span> {question.answer.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex gap-3 w-full justify-end">
            <Button color="gray" onClick={() => setShowPreview(false)}>
              <HiOutlineXMark className="mr-2 text-lg" />
              Tutup
            </Button>
            <Button color="light" onClick={handlePrintPDF}>
              <HiOutlinePrinter className="mr-2 text-lg" />
              Print
            </Button>
            <Button color="dark" onClick={handleDownloadPDF} disabled={isGenerating}>
              <HiOutlineDocumentArrowDown className="mr-2 text-lg" />
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}