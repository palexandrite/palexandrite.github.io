---
title: "File System and Disk Sectors"
meta_title: ""
description: ""
date: "2024-02-14T16:47:43+05:00"
author: "Alexander L. Bulatov"
tags: ["LBA", "disk parts", "file system parts"]
slug: "file-system-and-disk-sectors"
draft: false
---

The computer's disk is divided into logical sectors, that is, physically there are none.

Each sector takes up a certain number of bytes. This number can be viewed using the command:

```bash
blockdev --getpbsz /dev/sdb
```

You also need to know that in this case, section markup (or section style) of 2 types is used. They are also called formats.

The format is set when formatting the disk.

**The first** is the MBR (Master Boot Record). At the same time, the maximum disk size is 2 terabytes.

**The second** is GPT (GUID Partition Table). And in this format, the maximum disk size will be 1 zettabyte 512 bytes. This format was created to replace MBR and is part of UEFI, which replaced the BIOS.

The file system lies, if you omit any other points about the structure of computers, on top of all sectors of the disk, which in turn is also divided into sectors, but they are in no way related to the sectors of the disk, that is, they can have a completely different size. To find out the sizes and other parameters of the file system sectors, you need to enter the command (Block size is exactly the size of one block of the file system):

```bash
tune2fs -l /dev/sdb1
```

<hr>

**When we need to find a file, how do we know which sector or sectors it occupies in order to find it?** 

This is where inode will help. 

The inode is just one block of the file system. One file is one inode.

In ext2-type systems, we have a tabular system. The 'table' itself can be viewed through the tune2fs utility, which is mentioned above.

In the output of the command used above, you can see the Inode count parameter. This will be the number of available file system partitions.

<hr>

**For what reasons can a disk write error occur?**

For example, due to the fact that there are not enough blocks in the file system, just these inodes.

What can be done from the software side?

Ext2, Ext3, Ext4 systems have such an option as 'Reserved block count', which can be seen in the output to the console of the tune2fs utility (mentioned above). These are just the blocks of the file system that are available to the root user, but all these blocks are not available to other users. To temporarily solve the problem of failures, you can make them available to all users. An example of a command for this purpose:

```bash
tune2fs -m 0 /dev/foo
```

Non-root users cannot write 5% of the disk space.

Then there's another reason why there might be an error, it's the inode has run out and the space is left. For example, there are a lot of files on the disk that are smaller than a block of the file system.

To just look at or analyze, take the df utility and do two commands:

```bash
df -hi
```

```bash
df -h
```

<hr>

**Useful utilities for working with the disk:**

- debugfs