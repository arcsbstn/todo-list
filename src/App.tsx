import { FC, ChangeEvent, useState, } from 'react';
import {
  Button,
  Card,
  Checkbox,
  TextField,
  Typography,
} from '@mui/material'

interface ITask {
  label: string,
  description: string,
}

const App: FC = () => {
  const MAX_LABEL_LENGTH = 256;
  const MAX_DESCRIPTION_LENGTH = 1028;

  const [label, setLabel] = useState<string>('');
  const [labelLength, setLabelLength] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [descriptionLength, setDescriptionLength] = useState<number>(0);
  const [taskList, setTaskList] = useState<ITask[]>([]);

  const clearLabelAndDescription = (): void => {
    setLabel('');
    setLabelLength(0);
    setDescription('');
    setDescriptionLength(0);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'label') {
      setLabel(event.target.value);
      setLabelLength(event.target.value.length);
    } else {
      setDescription(event.target.value);
      setDescriptionLength(event.target.value.length);
    }
  };

  const handleSubmit = (): void => {
    if (label.length)
      setTaskList([...taskList, { label, description }]);
    clearLabelAndDescription();
  };

  const handleClear = (): void => {
    setTaskList([]);
    clearLabelAndDescription();
  };

  const handleDone = (doneIndex: number): void => {
    setTaskList(taskList.filter((task: ITask, index: number) =>
      index !== doneIndex
    ));
  };

  return (
    <div className='App'>
      <div className='header'>
        <TextField
          name='label'
          label='Label'
          value={label}
          onChange={handleChange}
          variant='outlined'
          inputProps={{
            maxLength: MAX_LABEL_LENGTH,
          }}
          helperText={`Characters: ${labelLength}/${MAX_LABEL_LENGTH}`}
          fullWidth
          required
        />
        <TextField
          name='description'
          label='Description'
          value={description}
          onChange={handleChange}
          variant='outlined'
          rows={3}
          inputProps={{
            maxLength: MAX_DESCRIPTION_LENGTH,
          }}
          helperText={`Characters: ${descriptionLength}/${MAX_DESCRIPTION_LENGTH}`}
          multiline
          fullWidth
        />
        <Button
          onClick={handleSubmit}
          variant='contained'
          color='primary'
        >
          Add Task
        </Button>
        <Button
          onClick={handleClear}
          variant='outlined'
        >
          Clear
        </Button>
      </div>
      <div className='list'>
        {
          taskList.map((task: ITask, index: number) => (
            <Card
              variant='outlined'
              key={`${task.label}-${index}`}
            >
              <Typography variant='h5'>{task.label}</Typography>
              <Typography variant='body2'>{task.description}</Typography>
              <Button
                onClick={() => handleDone(index)}
                variant='contained'
              >
                Done
              </Button>
            </Card>
          ))
        }
      </div>
    </div>
  );
}

export default App;
