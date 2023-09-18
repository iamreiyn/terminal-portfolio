import React, { useState, useEffect } from 'react';

const hackSimStr1 = `struct group_info init_groups = { .usage = ATOMIC_INIT(2) };

struct group_info *groups_alloc(int gidsetsize){

  struct group_info *group_info;

  int nblocks;

  int i;

  nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK;

  /* We always allocate at least one indirect block pointer */

  nblocks = nblocks ? : 1;

  group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER);

  if (!group_info)

    return NULL;

  group_info->ngroups = gidsetsize;

  group_info->nblocks = nblocks;

  atomic_set(&group_info->usage, 1);

  if (gidsetsize <= NGROUPS_SMALL)

    group_info->blocks[0] = group_info->small_block;

  else {

    for (i = 0; i < nblocks; i++) {

      gid_t *b;

      b = (void *)__get_free_page(GFP_USER);

      if (!b)

        goto out_undo_partial_alloc;

      group_info->blocks[i] = b;

    }

  }

  return group_info;
out_undo_partial_alloc:

while (--i >= 0) {

  free_page((unsigned long)group_info->blocks[i]);

}

kfree(group_info);

return NULL;

}`

const hackSimStr2 = `EXPORT_SYMBOL(groups_alloc);

void groups_free(struct group_info *group_info)

{

if (group_info->blocks[0] != group_info->small_block) {

  int i;

  for (i = 0; i < group_info->nblocks; i++)

    free_page((unsigned long)group_info->blocks[i]);

}

kfree(group_info);

}

EXPORT_SYMBOL(groups_free);

/* export the group_info to a user-space array */

static int groups_to_user(gid_t __user *grouplist,

      const struct group_info *group_info)

{`

const generateRandomText = () => {
  const words = [
    hackSimStr1,
    hackSimStr2,
    'Hacking in progress...',
    'System compromised.',
    'Password: ******',
    'Mainframe accessed.',
    'Initializing attack...',
  ];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

const HackerSimulator = () => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newText = generateRandomText();
      setDisplayText((prevText) => `${prevText} ${newText}`);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="hacker-simulator">
      <h1>Initializing Script...</h1>
      <div className="hacker-text" style={{ color: 'green' }}>
        {displayText}
      </div>
    </div>
  );
};

export default HackerSimulator;