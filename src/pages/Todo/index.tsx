import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PageBreadcrumbs from 'components/Page/PageBreadcrumbs';
import PageWrapper from 'components/Page/PageWrapper';
import useAlertDialog from 'hooks/useAlertDialog';
import useDialog from 'hooks/useDialog';
import useNotification from 'hooks/useNotification';
import { useDeleteTodo, useGetTodos } from 'queries/todo';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Todo } from 'types/todo';
import CreateTodo from './CreateTodo';
import DetailTodo from './DetailTodo';
import EditTodo from './EditTodo';

const Index = () => {
  const { t } = useTranslation();
  const setNotification = useNotification();
  const dialog = useAlertDialog();

  // The selected todo
  const [todo, setTodo] = useState<Todo | null>(null);

  // Dialog state
  const {
    isOpen: openCreate,
    open: handleOpenCreate,
    close: handleCloseCreate,
  } = useDialog();

  const {
    isOpen: openEdit,
    open: handleOpenEdit,
    close: handleCloseEdit,
  } = useDialog({
    onClose: () => {
      setTodo(null);
    },
  });

  const {
    isOpen: openDetail,
    open: handleOpenDetail,
    close: handleCloseDetail,
  } = useDialog({
    onClose: () => {
      setTodo(null);
    },
  });

  const { data: todos, isLoading, refetch } = useGetTodos();
  const deleteTodo = useDeleteTodo();

  const handleEditTodo = (todo: Todo) => () => {
    setTodo(todo);
    handleOpenEdit();
  };

  const handleDetailTodo = (todo: Todo) => () => {
    setTodo(todo);
    handleOpenDetail();
  };

  const handleDeleteTodo = (todo: Todo) => () => {
    if (!todo) return;

    dialog({
      title: 'Delete Todo',
      content: (
        <span>
          Are you sure you want to delete <strong>{todo.title}</strong>?
        </span>
      ),
      onSubmit: async () => {
        try {
          await deleteTodo.mutateAsync(todo.id);
          refetch();
          setNotification({
            message: 'Todo was successfully deleted',
          });
        } catch (error: any) {
          throw new Error(t(error.messageCode, { ns: 'todo' })); // Re throw the error
        }
      },
    });
  };

  return (
    <PageWrapper title={t('Todo')}>
      <PageBreadcrumbs
        page={t('Todo')}
        items={[{ title: t('Home'), href: '/' }]}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Paper sx={{ display: 'flex', justifyContent: 'flex-end', p: 2.5 }}>
          <Stack>
            <Button startIcon={<AddIcon />} onClick={handleOpenCreate}>
              Create Todo
            </Button>
          </Stack>
        </Paper>
        <Box>{isLoading && <CircularProgress />}</Box>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell component="th" scope="row">
                      {todo.title}
                    </TableCell>
                    <TableCell>{todo.description}</TableCell>
                    <TableCell>
                      <Chip
                        label={todo.isCompleted ? 'Completed' : 'In Progress'}
                        color={todo.isCompleted ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack>
                        <IconButton onClick={handleDetailTodo(todo)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={handleEditTodo(todo)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={handleDeleteTodo(todo)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <CreateTodo
          open={openCreate}
          onClose={handleCloseCreate}
          onRefresh={refetch}
        />
        <EditTodo
          open={openEdit}
          onClose={handleCloseEdit}
          onRefresh={refetch}
          todo={todo}
        />
        <DetailTodo
          open={openDetail}
          onClose={handleCloseDetail}
          onEdit={handleEditTodo}
          todo={todo}
        />
      </Box>
    </PageWrapper>
  );
};

export default Index;
