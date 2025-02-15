import { ChangeEvent, FormEvent, useState } from "react";
// components
import BasicModal from "@/components/model";
// type & data
import { TaskType } from "../type";
import { defaultFormData, taskFormData } from "../data";

interface AddTaskModalProps {
  handleAddTask: (task: TaskType) => void;
}

const AddTaskModal = ({ handleAddTask }: AddTaskModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<typeof defaultFormData>(
    () => defaultFormData
  );

  const handleModalChange = () => {
    setIsOpen((state) => !state);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id: name, value } = e.target;

    setFormData((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTask({ id: Date.now().toString(), ...formData } as TaskType);
    handleModalChange();
  };
  /**
   * TSX
   */
  return (
    <>
      <button
        onClick={handleModalChange}
        className="rounded-md px-4 py-1 shadow bg-gray-600 text-white hover:bg-gray-500"
      >
        Add
      </button>
      <BasicModal isOpen={isOpen} onClose={handleModalChange}>
        <div className="w-full h-[100%] flex flex-col items-center gap-2">
          <h3 className="text-2xl text-blue-400 font-[550]">Add Tasks</h3>
          <form
            onSubmit={handleSubmit}
            className="w-[90%] m-auto h-full flex flex-col justify-between py-4"
          >
            {taskFormData.map(({ id, label, placeholder, type }) => (
              <div key={id} className="flex flex-col gap-2">
                {" "}
                <label htmlFor="" className="text-xl text-gray-600">
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  value={formData[id] ?? ""}
                  placeholder={placeholder}
                  onChange={handleInputChange}
                  className="px-4 py-2 bg-gray-100 text-xl rounded-md focus:outline-gray-400"
                />
              </div>
            ))}

            <button
              type="submit"
              className="px-4 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-700"
            >
              submit
            </button>
          </form>
        </div>
      </BasicModal>
    </>
  );
};

export default AddTaskModal;
