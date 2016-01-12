---
layout: post
title: centos下安装MySQL-python
---
linux环境下安装MySQL-python比较复杂，现在记录一下我在centos6.5上面安装MySQL-python-1.2.5的过程。

* 首先下载MySQL-python-1.2.5.zip
  解压后按照标准的 python setup.py install方式安装，结果报错：
  {% highlight Bash %}
    sh: mysql_config: command not found
  Traceback (most recent call last):
  File "setup.py", line 17, in <module>
    metadata, options = get_config()
  File "/MySQL-python-1.2.5/setup_posix.py", line 43, in get_config
    libs = mysql_config("libs_r")
  File "/MySQL-python-1.2.5/setup_posix.py", line 25, in mysql_config
    raise EnvironmentError("%s not found" % (mysql_config.path,))
EnvironmentError: mysql_config not found
  {% endhighlight %}

 * 然后安装mysql客户端
   {% highlight Bash %}
   yum -y install mysql
Downloading Packages:
(1/2): mysql-5.1.73-5.el6_6.x86_64.rpm                                                              | 894 kB     00:00     
(2/2): mysql-libs-5.1.73-5.el6_6.x86_64.rpm                                                         | 1.2 MB     00:00     
---------------------------------------------------------------------------------------------------------------------------
Total                                                                                      3.6 MB/s | 2.1 MB     00:00     
Running rpm_check_debug
Running Transaction Test
Transaction Test Succeeded
Running Transaction
  Updating   : mysql-libs-5.1.73-5.el6_6.x86_64                                                                        1/3 
  Installing : mysql-5.1.73-5.el6_6.x86_64                                                                             2/3 
  Cleanup    : mysql-libs-5.1.69-1.el6_4.x86_64                                                                        3/3 
Unable to connect to dbus
  Verifying  : mysql-libs-5.1.73-5.el6_6.x86_64                                                                        1/3 
  Verifying  : mysql-5.1.73-5.el6_6.x86_64                                                                             2/3 
  Verifying  : mysql-libs-5.1.69-1.el6_4.x86_64                                                                        3/3 

Installed:
  mysql.x86_64 0:5.1.73-5.el6_6                                                                                            

Dependency Updated:
  mysql-libs.x86_64 0:5.1.73-5.el6_6                                                                                       

Complete!
  {% endhighlight %}  

  * 再次安装MySQL-python
    {% highlight java %}
    [root@test MySQL-python-1.2.5]# python setup.py install
running install
running bdist_egg
running egg_info
writing MySQL_python.egg-info/PKG-INFO
writing top-level names to MySQL_python.egg-info/top_level.txt
writing dependency_links to MySQL_python.egg-info/dependency_links.txt
reading manifest file 'MySQL_python.egg-info/SOURCES.txt'
reading manifest template 'MANIFEST.in'
writing manifest file 'MySQL_python.egg-info/SOURCES.txt'
installing library code to build/bdist.linux-x86_64/egg
running install_lib
running build_py
creating build
creating build/lib.linux-x86_64-2.7
copying _mysql_exceptions.py -> build/lib.linux-x86_64-2.7
creating build/lib.linux-x86_64-2.7/MySQLdb
copying MySQLdb/__init__.py -> build/lib.linux-x86_64-2.7/MySQLdb
copying MySQLdb/converters.py -> build/lib.linux-x86_64-2.7/MySQLdb
copying MySQLdb/connections.py -> build/lib.linux-x86_64-2.7/MySQLdb
copying MySQLdb/cursors.py -> build/lib.linux-x86_64-2.7/MySQLdb
copying MySQLdb/release.py -> build/lib.linux-x86_64-2.7/MySQLdb
copying MySQLdb/times.py -> build/lib.linux-x86_64-2.7/MySQLdb
creating build/lib.linux-x86_64-2.7/MySQLdb/constants
copying MySQLdb/constants/__init__.py -> build/lib.linux-x86_64-2.7/MySQLdb/constants
copying MySQLdb/constants/CR.py -> build/lib.linux-x86_64-2.7/MySQLdb/constants
copying MySQLdb/constants/FIELD_TYPE.py -> build/lib.linux-x86_64-2.7/MySQLdb/constants
copying MySQLdb/constants/ER.py -> build/lib.linux-x86_64-2.7/MySQLdb/constants
copying MySQLdb/constants/FLAG.py -> build/lib.linux-x86_64-2.7/MySQLdb/constants
copying MySQLdb/constants/REFRESH.py -> build/lib.linux-x86_64-2.7/MySQLdb/constants
copying MySQLdb/constants/CLIENT.py -> build/lib.linux-x86_64-2.7/MySQLdb/constants
running build_ext
building '_mysql' extension
creating build/temp.linux-x86_64-2.7
gcc -pthread -fno-strict-aliasing -g -O2 -DNDEBUG -g -fwrapv -O3 -Wall -Wstrict-prototypes -fPIC -Dversion_info=(1,2,5,'final',1) -D__version__=1.2.5 -I/usr/include/mysql -I/usr/local/include/python2.7 -c _mysql.c -o build/temp.linux-x86_64-2.7/_mysql.o -g -pipe -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector --param=ssp-buffer-size=4 -m64 -D_GNU_SOURCE -D_FILE_OFFSET_BITS=64 -D_LARGEFILE_SOURCE -fno-strict-aliasing -fwrapv -fPIC -DUNIV_LINUX -DUNIV_LINUX
_mysql.c:44:23: error: my_config.h: No such file or directory
_mysql.c:46:19: error: mysql.h: No such file or directory
_mysql.c:47:26: error: mysqld_error.h: No such file or directory
_mysql.c:48:20: error: errmsg.h: No such file or directory
_mysql.c:88: error: expected specifier-qualifier-list before ‘MYSQL’
_mysql.c:102: error: expected specifier-qualifier-list before ‘MYSQL_RES’
_mysql.c: In function ‘_mysql_Exception’:
_mysql.c:146: warning: implicit declaration of function ‘mysql_errno’
_mysql.c:146: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:149: error: ‘CR_MAX_ERROR’ undeclared (first use in this function)
_mysql.c:149: error: (Each undeclared identifier is reported only once
_mysql.c:149: error: for each function it appears in.)
_mysql.c:161: error: ‘CR_COMMANDS_OUT_OF_SYNC’ undeclared (first use in this function)
_mysql.c:162: error: ‘ER_DB_CREATE_EXISTS’ undeclared (first use in this function)
_mysql.c:163: error: ‘ER_SYNTAX_ERROR’ undeclared (first use in this function)
_mysql.c:164: error: ‘ER_PARSE_ERROR’ undeclared (first use in this function)
_mysql.c:165: error: ‘ER_NO_SUCH_TABLE’ undeclared (first use in this function)
_mysql.c:166: error: ‘ER_WRONG_DB_NAME’ undeclared (first use in this function)
_mysql.c:167: error: ‘ER_WRONG_TABLE_NAME’ undeclared (first use in this function)
_mysql.c:168: error: ‘ER_FIELD_SPECIFIED_TWICE’ undeclared (first use in this function)
_mysql.c:169: error: ‘ER_INVALID_GROUP_FUNC_USE’ undeclared (first use in this function)
_mysql.c:170: error: ‘ER_UNSUPPORTED_EXTENSION’ undeclared (first use in this function)
_mysql.c:171: error: ‘ER_TABLE_MUST_HAVE_COLUMNS’ undeclared (first use in this function)
_mysql.c:200: error: ‘ER_DUP_ENTRY’ undeclared (first use in this function)
_mysql.c:246: warning: implicit declaration of function ‘mysql_error’
_mysql.c:246: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_server_init’:
_mysql.c:351: warning: label ‘finish’ defined but not used
_mysql.c:268: warning: unused variable ‘item’
_mysql.c:267: warning: unused variable ‘groupc’
_mysql.c:267: warning: unused variable ‘i’
_mysql.c:267: warning: unused variable ‘cmd_argc’
_mysql.c:266: warning: unused variable ‘s’
_mysql.c: In function ‘_mysql_ResultObject_Initialize’:
_mysql.c:406: error: ‘MYSQL_RES’ undeclared (first use in this function)
_mysql.c:406: error: ‘result’ undeclared (first use in this function)
_mysql.c:411: error: ‘MYSQL_FIELD’ undeclared (first use in this function)
_mysql.c:411: error: ‘fields’ undeclared (first use in this function)
_mysql.c:425: error: ‘_mysql_ResultObject’ has no member named ‘use’
_mysql.c:428: warning: implicit declaration of function ‘mysql_use_result’
_mysql.c:428: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:430: warning: implicit declaration of function ‘mysql_store_result’
_mysql.c:430: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:431: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:434: warning: implicit declaration of function ‘mysql_field_count’
_mysql.c:434: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:438: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c:442: warning: implicit declaration of function ‘mysql_num_fields’
_mysql.c:443: error: ‘_mysql_ResultObject’ has no member named ‘nfields’
_mysql.c:444: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c:448: warning: implicit declaration of function ‘mysql_fetch_fields’
_mysql.c:489: error: ‘BINARY_FLAG’ undeclared (first use in this function)
_mysql.c:512: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c: In function ‘_mysql_ResultObject_traverse’:
_mysql.c:526: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c:527: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c: In function ‘_mysql_ResultObject_clear’:
_mysql.c:538: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c:538: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c:538: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c:538: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c:539: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c: In function ‘_mysql_ConnectionObject_Initialize’:
_mysql.c:551: error: ‘MYSQL’ undeclared (first use in this function)
_mysql.c:551: error: ‘conn’ undeclared (first use in this function)
_mysql.c:584: error: ‘_mysql_ConnectionObject’ has no member named ‘converter’
_mysql.c:585: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:636: warning: implicit declaration of function ‘mysql_init’
_mysql.c:636: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:639: warning: implicit declaration of function ‘mysql_options’
_mysql.c:639: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:639: error: ‘MYSQL_OPT_CONNECT_TIMEOUT’ undeclared (first use in this function)
_mysql.c:655: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:655: error: ‘MYSQL_OPT_COMPRESS’ undeclared (first use in this function)
_mysql.c:656: error: ‘CLIENT_COMPRESS’ undeclared (first use in this function)
_mysql.c:659: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:659: error: ‘MYSQL_OPT_NAMED_PIPE’ undeclared (first use in this function)
_mysql.c:661: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:661: error: ‘MYSQL_INIT_COMMAND’ undeclared (first use in this function)
_mysql.c:663: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:663: error: ‘MYSQL_READ_DEFAULT_FILE’ undeclared (first use in this function)
_mysql.c:665: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:665: error: ‘MYSQL_READ_DEFAULT_GROUP’ undeclared (first use in this function)
_mysql.c:668: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:668: error: ‘MYSQL_OPT_LOCAL_INFILE’ undeclared (first use in this function)
_mysql.c:676: warning: implicit declaration of function ‘mysql_real_connect’
_mysql.c:676: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:694: error: ‘_mysql_ConnectionObject’ has no member named ‘converter’
_mysql.c:702: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c: In function ‘_mysql_ConnectionObject_traverse’:
_mysql.c:783: error: ‘_mysql_ConnectionObject’ has no member named ‘converter’
_mysql.c:784: error: ‘_mysql_ConnectionObject’ has no member named ‘converter’
_mysql.c: In function ‘_mysql_ConnectionObject_clear’:
_mysql.c:792: error: ‘_mysql_ConnectionObject’ has no member named ‘converter’
_mysql.c:792: error: ‘_mysql_ConnectionObject’ has no member named ‘converter’
_mysql.c:792: error: ‘_mysql_ConnectionObject’ has no member named ‘converter’
_mysql.c:792: error: ‘_mysql_ConnectionObject’ has no member named ‘converter’
_mysql.c:793: error: ‘_mysql_ConnectionObject’ has no member named ‘converter’
_mysql.c: In function ‘_mysql_ConnectionObject_close’:
_mysql.c:808: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:810: warning: implicit declaration of function ‘mysql_close’
_mysql.c:810: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:812: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c: In function ‘_mysql_ConnectionObject_affected_rows’:
_mysql.c:834: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:835: warning: implicit declaration of function ‘mysql_affected_rows’
_mysql.c:835: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_debug’:
_mysql.c:851: warning: implicit declaration of function ‘mysql_debug’
_mysql.c: In function ‘_mysql_ConnectionObject_dump_debug_info’:
_mysql.c:869: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:871: warning: implicit declaration of function ‘mysql_dump_debug_info’
_mysql.c:871: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_autocommit’:
_mysql.c:895: warning: implicit declaration of function ‘mysql_query’
_mysql.c:895: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_get_autocommit’:
_mysql.c:912: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:912: error: ‘SERVER_STATUS_AUTOCOMMIT’ undeclared (first use in this function)
_mysql.c: In function ‘_mysql_ConnectionObject_commit’:
_mysql.c:932: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_rollback’:
_mysql.c:954: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_errno’:
_mysql.c:1070: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1071: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_error’:
_mysql.c:1086: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1090: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_escape_string’:
_mysql.c:1123: warning: implicit declaration of function ‘mysql_escape_string’
_mysql.c: In function ‘_mysql_escape’:
_mysql.c:1252: error: ‘_mysql_ConnectionObject’ has no member named ‘converter’
_mysql.c: In function ‘_mysql_ResultObject_describe’:
_mysql.c:1332: error: ‘MYSQL_FIELD’ undeclared (first use in this function)
_mysql.c:1332: error: ‘fields’ undeclared (first use in this function)
_mysql.c:1335: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1336: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:1337: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:1348: warning: implicit declaration of function ‘IS_NOT_NULL’
_mysql.c: In function ‘_mysql_ResultObject_field_flags’:
_mysql.c:1368: error: ‘MYSQL_FIELD’ undeclared (first use in this function)
_mysql.c:1368: error: ‘fields’ undeclared (first use in this function)
_mysql.c:1371: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1372: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:1373: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c: At top level:
_mysql.c:1419: error: expected declaration specifiers or ‘...’ before ‘MYSQL_ROW’
_mysql.c: In function ‘_mysql_row_to_tuple’:
_mysql.c:1425: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:1427: warning: implicit declaration of function ‘mysql_fetch_lengths’
_mysql.c:1427: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:1430: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c:1431: error: ‘row’ undeclared (first use in this function)
_mysql.c: At top level:
_mysql.c:1444: error: expected declaration specifiers or ‘...’ before ‘MYSQL_ROW’
_mysql.c: In function ‘_mysql_row_to_dict’:
_mysql.c:1449: error: ‘MYSQL_FIELD’ undeclared (first use in this function)
_mysql.c:1449: error: ‘fields’ undeclared (first use in this function)
_mysql.c:1451: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:1453: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:1454: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:1457: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c:1458: error: ‘row’ undeclared (first use in this function)
_mysql.c: At top level:
_mysql.c:1483: error: expected declaration specifiers or ‘...’ before ‘MYSQL_ROW’
_mysql.c: In function ‘_mysql_row_to_dict_old’:
_mysql.c:1488: error: ‘MYSQL_FIELD’ undeclared (first use in this function)
_mysql.c:1488: error: ‘fields’ undeclared (first use in this function)
_mysql.c:1490: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:1492: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:1493: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:1496: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c:1497: error: ‘row’ undeclared (first use in this function)
_mysql.c: At top level:
_mysql.c:1519: error: expected declaration specifiers or ‘...’ before ‘MYSQL_ROW’
_mysql.c: In function ‘_mysql__fetch_row’:
_mysql.c:1530: error: ‘MYSQL_ROW’ undeclared (first use in this function)
_mysql.c:1530: error: expected ‘;’ before ‘row’
_mysql.c:1534: error: ‘_mysql_ResultObject’ has no member named ‘use’
_mysql.c:1535: error: ‘row’ undeclared (first use in this function)
_mysql.c:1535: warning: implicit declaration of function ‘mysql_fetch_row’
_mysql.c:1535: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:1538: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:1541: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:1549: error: too many arguments to function ‘convert_row’
_mysql.c: In function ‘_mysql_ResultObject_fetch_row’:
_mysql.c:1573: error: expected declaration specifiers or ‘...’ before ‘MYSQL_ROW’
_mysql.c:1588: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1600: error: ‘_mysql_ResultObject’ has no member named ‘use’
_mysql.c:1614: warning: implicit declaration of function ‘mysql_num_rows’
_mysql.c:1614: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c: In function ‘_mysql_ConnectionObject_character_set_name’:
_mysql.c:1681: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c: In function ‘_mysql_get_client_info’:
_mysql.c:1792: warning: implicit declaration of function ‘mysql_get_client_info’
_mysql.c:1792: warning: passing argument 1 of ‘PyString_FromString’ makes pointer from integer without a cast
/usr/local/include/python2.7/stringobject.h:63: note: expected ‘const char *’ but argument is of type ‘int’
_mysql.c: In function ‘_mysql_ConnectionObject_get_host_info’:
_mysql.c:1807: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1811: warning: implicit declaration of function ‘mysql_get_host_info’
_mysql.c:1811: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_get_proto_info’:
_mysql.c:1826: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1827: warning: implicit declaration of function ‘mysql_get_proto_info’
_mysql.c:1827: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_get_server_info’:
_mysql.c:1841: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1845: warning: implicit declaration of function ‘mysql_get_server_info’
_mysql.c:1845: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_info’:
_mysql.c:1862: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1863: warning: implicit declaration of function ‘mysql_info’
_mysql.c:1863: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_insert_id’:
_mysql.c:1899: error: ‘my_ulonglong’ undeclared (first use in this function)
_mysql.c:1899: error: expected ‘;’ before ‘r’
_mysql.c:1901: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1903: error: ‘r’ undeclared (first use in this function)
_mysql.c:1903: warning: implicit declaration of function ‘mysql_insert_id’
_mysql.c:1903: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_kill’:
_mysql.c:1920: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1922: warning: implicit declaration of function ‘mysql_kill’
_mysql.c:1922: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_field_count’:
_mysql.c:1941: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1943: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ResultObject_num_fields’:
_mysql.c:1958: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1959: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c: In function ‘_mysql_ResultObject_num_rows’:
_mysql.c:1974: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:1975: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c: In function ‘_mysql_ConnectionObject_ping’:
_mysql.c:2004: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:2005: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:2007: warning: implicit declaration of function ‘mysql_ping’
_mysql.c:2007: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_query’:
_mysql.c:2028: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:2030: warning: implicit declaration of function ‘mysql_real_query’
_mysql.c:2030: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_select_db’:
_mysql.c:2058: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:2060: warning: implicit declaration of function ‘mysql_select_db’
_mysql.c:2060: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_shutdown’:
_mysql.c:2079: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:2081: warning: implicit declaration of function ‘mysql_shutdown’
_mysql.c:2081: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_stat’:
_mysql.c:2106: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:2108: warning: implicit declaration of function ‘mysql_stat’
_mysql.c:2108: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_store_result’:
_mysql.c:2134: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:2135: error: ‘_mysql_ConnectionObject’ has no member named ‘converter’
_mysql.c:2144: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c: In function ‘_mysql_ConnectionObject_thread_id’:
_mysql.c:2173: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:2175: warning: implicit declaration of function ‘mysql_thread_id’
_mysql.c:2175: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ConnectionObject_use_result’:
_mysql.c:2195: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:2196: error: ‘_mysql_ConnectionObject’ has no member named ‘converter’
_mysql.c:2205: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c: In function ‘_mysql_ConnectionObject_dealloc’:
_mysql.c:2223: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c: In function ‘_mysql_ConnectionObject_repr’:
_mysql.c:2235: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:2237: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c: In function ‘_mysql_ResultObject_data_seek’:
_mysql.c:2258: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:2259: warning: implicit declaration of function ‘mysql_data_seek’
_mysql.c:2259: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c: In function ‘_mysql_ResultObject_row_seek’:
_mysql.c:2272: error: ‘MYSQL_ROW_OFFSET’ undeclared (first use in this function)
_mysql.c:2272: error: expected ‘;’ before ‘r’
_mysql.c:2274: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:2275: error: ‘_mysql_ResultObject’ has no member named ‘use’
_mysql.c:2280: error: ‘r’ undeclared (first use in this function)
_mysql.c:2280: warning: implicit declaration of function ‘mysql_row_tell’
_mysql.c:2280: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:2281: warning: implicit declaration of function ‘mysql_row_seek’
_mysql.c:2281: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c: In function ‘_mysql_ResultObject_row_tell’:
_mysql.c:2293: error: ‘MYSQL_ROW_OFFSET’ undeclared (first use in this function)
_mysql.c:2293: error: expected ‘;’ before ‘r’
_mysql.c:2295: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:2296: error: ‘_mysql_ResultObject’ has no member named ‘use’
_mysql.c:2301: error: ‘r’ undeclared (first use in this function)
_mysql.c:2301: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c:2302: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c: In function ‘_mysql_ResultObject_dealloc’:
_mysql.c:2310: warning: implicit declaration of function ‘mysql_free_result’
_mysql.c:2310: error: ‘_mysql_ResultObject’ has no member named ‘result’
_mysql.c: At top level:
_mysql.c:2551: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
_mysql.c:2558: error: ‘_mysql_ConnectionObject’ has no member named ‘converter’
_mysql.c:2565: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:2572: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:2579: error: ‘_mysql_ConnectionObject’ has no member named ‘connection’
_mysql.c:2642: error: ‘_mysql_ResultObject’ has no member named ‘converter’
_mysql.c:2642: error: initializer element is not constant
_mysql.c:2642: error: (near initialization for ‘_mysql_ResultObject_memberlist[0].offset’)
_mysql.c: In function ‘_mysql_ConnectionObject_getattr’:
_mysql.c:2666: error: ‘_mysql_ConnectionObject’ has no member named ‘open’
error: command 'gcc' failed with exit status 1
    {% endhighlight %}  

  * 需要修改site.cfg
    先找到mysql_config路径
    {% highlight python %}
    [root@test MySQL-python-1.2.5]# whereis  mysql_config 
    mysql_config: /usr/bin/mysql_config /usr/share/man/man1/mysql_config.1.gz
    {% endhighlight %}  

    $ vim site.cfg
    修改mysql_config为mysql配置文件的路径 /usr/bin/mysql_config
    还要修改
    threadsafe = False

*  再次安装依然报错
   这回下载来mysql-connector-c-devel-6.1.6-1.linux_glibc2.5.x86_64.rpm和mysql-connector-c-shared-6.1.6-1.linux_glibc2.5.x86_64.rpm
   用rpm命令安装
   {% highlight java %}
    [root@test /]# rpm -ivh mysql-connector-c-devel-6.1.6-1.linux_glibc2.5.x86_64.rpm
    Preparing...                ########################################### [100%]
   1:mysql-connector-c-devel########################################### [100%]
    [root@test /]# rpm -ivh mysql-connector-c-shared-6.1.6-1.linux_glibc2.5.x86_64.rpm
    Preparing...                ########################################### [100%]
   1:mysql-connector-c-share########################################### [100%]
   {% endhighlight %}

*  这回build和install成功了
  {% highlight java %}
    [root@test MySQL-python-1.2.5]# python setup.py build
running build
running build_py
copying MySQLdb/release.py -> build/lib.linux-x86_64-2.7/MySQLdb
running build_ext
building '_mysql' extension
gcc -pthread -fno-strict-aliasing -g -O2 -DNDEBUG -g -fwrapv -O3 -Wall -Wstrict-prototypes -fPIC -Dversion_info=(1,2,5,'final',1) -D__version__=1.2.5 -I/usr/include/mysql -I/usr/local/include/python2.7 -c _mysql.c -o build/temp.linux-x86_64-2.7/_mysql.o -g -pipe -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector --param=ssp-buffer-size=4 -m64 -D_GNU_SOURCE -D_FILE_OFFSET_BITS=64 -D_LARGEFILE_SOURCE -fno-strict-aliasing -fwrapv -fPIC -DUNIV_LINUX -DUNIV_LINUX
In file included from /usr/include/mysql/mysql.h:64,
                 from _mysql.c:46:
/usr/include/mysql/mysql/client_plugin.h:97: warning: function declaration isn’t a prototype
In file included from /usr/include/mysql/mysql.h:64,
                 from _mysql.c:46:
/usr/include/mysql/mysql/client_plugin.h:107: warning: function declaration isn’t a prototype
gcc -pthread -shared build/temp.linux-x86_64-2.7/_mysql.o -L/usr/lib64/mysql -lmysqlclient -lz -lcrypt -lnsl -lm -lssl -lcrypto -o build/lib.linux-x86_64-2.7/_mysql.so
[root@test MySQL-python-1.2.5]# python setup.py install
running install
running bdist_egg
running egg_info
writing MySQL_python.egg-info/PKG-INFO
writing top-level names to MySQL_python.egg-info/top_level.txt
writing dependency_links to MySQL_python.egg-info/dependency_links.txt
reading manifest file 'MySQL_python.egg-info/SOURCES.txt'
reading manifest template 'MANIFEST.in'
writing manifest file 'MySQL_python.egg-info/SOURCES.txt'
installing library code to build/bdist.linux-x86_64/egg
running install_lib
running build_py
copying MySQLdb/release.py -> build/lib.linux-x86_64-2.7/MySQLdb
running build_ext
creating build/bdist.linux-x86_64
creating build/bdist.linux-x86_64/egg
creating build/bdist.linux-x86_64/egg/MySQLdb
copying build/lib.linux-x86_64-2.7/MySQLdb/times.py -> build/bdist.linux-x86_64/egg/MySQLdb
copying build/lib.linux-x86_64-2.7/MySQLdb/converters.py -> build/bdist.linux-x86_64/egg/MySQLdb
creating build/bdist.linux-x86_64/egg/MySQLdb/constants
copying build/lib.linux-x86_64-2.7/MySQLdb/constants/FLAG.py -> build/bdist.linux-x86_64/egg/MySQLdb/constants
copying build/lib.linux-x86_64-2.7/MySQLdb/constants/ER.py -> build/bdist.linux-x86_64/egg/MySQLdb/constants
copying build/lib.linux-x86_64-2.7/MySQLdb/constants/__init__.py -> build/bdist.linux-x86_64/egg/MySQLdb/constants
copying build/lib.linux-x86_64-2.7/MySQLdb/constants/CLIENT.py -> build/bdist.linux-x86_64/egg/MySQLdb/constants
copying build/lib.linux-x86_64-2.7/MySQLdb/constants/FIELD_TYPE.py -> build/bdist.linux-x86_64/egg/MySQLdb/constants
copying build/lib.linux-x86_64-2.7/MySQLdb/constants/REFRESH.py -> build/bdist.linux-x86_64/egg/MySQLdb/constants
copying build/lib.linux-x86_64-2.7/MySQLdb/constants/CR.py -> build/bdist.linux-x86_64/egg/MySQLdb/constants
copying build/lib.linux-x86_64-2.7/MySQLdb/__init__.py -> build/bdist.linux-x86_64/egg/MySQLdb
copying build/lib.linux-x86_64-2.7/MySQLdb/connections.py -> build/bdist.linux-x86_64/egg/MySQLdb
copying build/lib.linux-x86_64-2.7/MySQLdb/release.py -> build/bdist.linux-x86_64/egg/MySQLdb
copying build/lib.linux-x86_64-2.7/MySQLdb/cursors.py -> build/bdist.linux-x86_64/egg/MySQLdb
copying build/lib.linux-x86_64-2.7/_mysql_exceptions.py -> build/bdist.linux-x86_64/egg
copying build/lib.linux-x86_64-2.7/_mysql.so -> build/bdist.linux-x86_64/egg
byte-compiling build/bdist.linux-x86_64/egg/MySQLdb/times.py to times.pyc
byte-compiling build/bdist.linux-x86_64/egg/MySQLdb/converters.py to converters.pyc
byte-compiling build/bdist.linux-x86_64/egg/MySQLdb/constants/FLAG.py to FLAG.pyc
byte-compiling build/bdist.linux-x86_64/egg/MySQLdb/constants/ER.py to ER.pyc
byte-compiling build/bdist.linux-x86_64/egg/MySQLdb/constants/__init__.py to __init__.pyc
byte-compiling build/bdist.linux-x86_64/egg/MySQLdb/constants/CLIENT.py to CLIENT.pyc
byte-compiling build/bdist.linux-x86_64/egg/MySQLdb/constants/FIELD_TYPE.py to FIELD_TYPE.pyc
byte-compiling build/bdist.linux-x86_64/egg/MySQLdb/constants/REFRESH.py to REFRESH.pyc
byte-compiling build/bdist.linux-x86_64/egg/MySQLdb/constants/CR.py to CR.pyc
byte-compiling build/bdist.linux-x86_64/egg/MySQLdb/__init__.py to __init__.pyc
byte-compiling build/bdist.linux-x86_64/egg/MySQLdb/connections.py to connections.pyc
byte-compiling build/bdist.linux-x86_64/egg/MySQLdb/release.py to release.pyc
byte-compiling build/bdist.linux-x86_64/egg/MySQLdb/cursors.py to cursors.pyc
byte-compiling build/bdist.linux-x86_64/egg/_mysql_exceptions.py to _mysql_exceptions.pyc
creating stub loader for _mysql.so
byte-compiling build/bdist.linux-x86_64/egg/_mysql.py to _mysql.pyc
creating build/bdist.linux-x86_64/egg/EGG-INFO
copying MySQL_python.egg-info/PKG-INFO -> build/bdist.linux-x86_64/egg/EGG-INFO
copying MySQL_python.egg-info/SOURCES.txt -> build/bdist.linux-x86_64/egg/EGG-INFO
copying MySQL_python.egg-info/dependency_links.txt -> build/bdist.linux-x86_64/egg/EGG-INFO
copying MySQL_python.egg-info/top_level.txt -> build/bdist.linux-x86_64/egg/EGG-INFO
writing build/bdist.linux-x86_64/egg/EGG-INFO/native_libs.txt
zip_safe flag not set; analyzing archive contents...
creating dist
creating 'dist/MySQL_python-1.2.5-py2.7-linux-x86_64.egg' and adding 'build/bdist.linux-x86_64/egg' to it
removing 'build/bdist.linux-x86_64/egg' (and everything under it)
Processing MySQL_python-1.2.5-py2.7-linux-x86_64.egg
Copying MySQL_python-1.2.5-py2.7-linux-x86_64.egg to /usr/local/lib/python2.7/site-packages
Adding MySQL-python 1.2.5 to easy-install.pth file

Installed /usr/local/lib/python2.7/site-packages/MySQL_python-1.2.5-py2.7-linux-x86_64.egg
Processing dependencies for MySQL-python==1.2.5
Finished processing dependencies for MySQL-python==1.2.5
   {% endhighlight %}

*  但是import时报错
    {% highlight java %}
    >>> import MySQLdb
    /usr/local/lib/python2.7/site-packages/MySQL_python-1.2.5-py2.7-linux-x86_64.egg/_mysql.py:3: UserWarning: Module _mysql was already imported from /usr/local/lib/python2.7/site-packages/MySQL_python-1.2.5-py2.7-linux-x86_64.egg/_mysql.pyc, but /MySQL-python-1.2.5 is being added to sys.path
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
      File "MySQLdb/__init__.py", line 19, in <module>
        import _mysql
      File "build/bdist.linux-x86_64/egg/_mysql.py", line 7, in <module>
      File "build/bdist.linux-x86_64/egg/_mysql.py", line 6, in __bootstrap__
    ImportError: /root/.python-eggs/MySQL_python-1.2.5-py2.7-linux-x86_64.egg-tmp/_mysql.so: undefined symbol: __cxa_pure_virtual
    {% endhighlight %}

*  经查得知是由于编译Python所用的编译器与编译MySQL-python所用编译器不同所致。
  需要g++重新编译_mysql.so
  {% highlight java %}
  [root@test MySQL-python-1.2.5]# cd build/
  [root@test build]# g++ -pthread -shared ./temp.linux-x86_64-2.7/_mysql.o -L/usr/lib64 -l mysqlclient_r -lpthread -lm -lrt -ldl -o ./lib.linux-x86_64-2.7/_mysql.so
  {% endhighlight %}

*  最后再重新build和install一下MySQL-python就成功了
 {% highlight python %}
  [root@test /]# python
  Python 2.7.4 (default, Jul  2 2015, 15:10:50) 
  [GCC 4.4.7 20120313 (Red Hat 4.4.7-11)] on linux2
  Type "help", "copyright", "credits" or "license" for more information.
  >>> import MySQLdb
  >>> dir(MySQLdb)
  ['BINARY', 'Binary', 'Connect', 'Connection', 'DATE', 'DATETIME', 'DBAPISet', 'DataError', 'DatabaseError', 'Date', 'DateFromTicks', 'Error', 'FIELD_TYPE', 'IntegrityError', 'InterfaceError', 'InternalError', 'MySQLError', 'NULL', 'NUMBER', 'NotSupportedError', 'OperationalError', 'ProgrammingError', 'ROWID', 'STRING', 'TIME', 'TIMESTAMP', 'Time', 'TimeFromTicks', 'Timestamp', 'TimestampFromTicks', 'Warning', '__all__', '__author__', '__builtins__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__path__', '__revision__', '__version__', '_mysql', 'apilevel', 'connect', 'connection', 'constants', 'debug', 'escape', 'escape_dict', 'escape_sequence', 'escape_string', 'get_client_info', 'paramstyle', 'release', 'result', 'server_end', 'server_init', 'string_literal', 'test_DBAPISet_set_equality', 'test_DBAPISet_set_equality_membership', 'test_DBAPISet_set_inequality', 'test_DBAPISet_set_inequality_membership', 'thread_safe', 'threadsafety', 'times', 'version_info']
  >>> MySQLdb.version_info
  (1, 2, 5, 'final', 1)
  {% endhighlight %}



