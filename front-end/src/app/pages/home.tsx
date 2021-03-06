import * as React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MemberForm from '../components/MemberForm';
import MemberTable from '../components/MemberTable';

import { IMember } from '../interfaces';
import { addMember, deleteMember, getMembers } from '../api';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(5),
  }
}));

export function HomePage() {
  const classes = useStyles();
  const [memberList, setMemberList] = React.useState<IMember[]>([]);
  React.useEffect(() => {
    loadMembers();
  }, []);
  const loadMembers = () => {
    getMembers().then(members => {
      setMemberList(members);
    })
    .catch(e => setMemberList([]));
  }
  const handleAddMember = (data: IMember) => {
    return addMember(data)
      .then(member => loadMembers())
  }
  const handleDeleteMember = (id: string) => {
    return deleteMember(id)
      .then(deleted => {
        if (deleted) {
          return loadMembers();
        }
      });
  }
  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h4" className={classes.title}>
        Member Management
      </Typography>
      <MemberForm 
        addMember={handleAddMember} />
      <MemberTable 
        rows={memberList}
        deleteMember={handleDeleteMember}
        />
    </Container>
  );
}
