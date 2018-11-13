<template>
      <Layout>
        <Header style='height: 64px;background: #515a6e;position:fixed;z-index:1;width: 100%'> 
          <Row>
              <Col span="24" >
                  <Input v-model="value" @keyup.enter.native="submit" placeholder="Enter something..."  />
              </Col>
          </Row>
      </Header>
        <Content style='padding-top:64px;'>
          <Card :bordered="false">
             <Table  :loading="loading"  height="600"  :columns="columns1"  :data="data2"></Table>
          </Card>

        </Content>
        <Footer style='text-align: center'> power by electron </Footer>
    </Layout>
</template>

<script>

 // window.data = JSON.parse('[{"create":"2018-11-11","fullname":"/Users/dancesmile/Desktop/posts-collect/root/son/deep/deep.doc","name":"deep.doc","stats":{"atime":"2018-11-11T05:20:42.486Z","atimeMs":1541913642486.2375,"birthtime":"2018-11-11T05:20:42.486Z","birthtimeMs":1541913642486.2375,"blksize":4096,"blocks":0,"ctime":"2018-11-11T05:20:42.486Z","ctimeMs":1541913642486.2375,"dev":16777220,"gid":20,"ino":8593765555,"mode":33188,"mtime":"2018-11-11T05:20:42.486Z","mtimeMs":1541913642486.2375,"nlink":1,"rdev":0,"size":0,"uid":501},"type":"DOC"},{"create":"2018-11-11","fullname":"/Users/dancesmile/Desktop/posts-collect/root/son/test.pptx","name":"test.pptx","stats":{"atime":"2018-11-11T05:20:16.341Z","atimeMs":1541913616340.9163,"birthtime":"2018-11-11T05:20:16.341Z","birthtimeMs":1541913616340.9163,"blksize":4096,"blocks":0,"ctime":"2018-11-11T05:20:16.341Z","ctimeMs":1541913616340.9163,"dev":16777220,"gid":20,"ino":8593765533,"mode":33188,"mtime":"2018-11-11T05:20:16.341Z","mtimeMs":1541913616340.9163,"nlink":1,"rdev":0,"size":0,"uid":501},"type":"PPTX"},{"create":"2018-11-11","fullname":"/Users/dancesmile/Desktop/posts-collect/root/test.doc","name":"test.doc","stats":{"atime":"2018-11-10T17:38:31.446Z","atimeMs":1541871511445.9858,"birthtime":"2018-11-10T17:38:31.446Z","birthtimeMs":1541871511445.9858,"blksize":4096,"blocks":0,"ctime":"2018-11-10T17:39:10.867Z","ctimeMs":1541871550866.697,"dev":16777220,"gid":20,"ino":8593762671,"mode":33188,"mtime":"2018-11-10T17:38:31.446Z","mtimeMs":1541871511445.9858,"nlink":1,"rdev":0,"size":0,"uid":501},"type":"DOC"}]')


import bus from "./bus.js"
export default {
  name: 'app',
  data () {
    return {
          value:'',
          loading: true,
          columns1: [
              {
                  title: '文件名',
                  key: 'name',
                  render: (h, params) => {
                      return h('div', [
                         
                          h('strong', params.row.name),
                         
                      ]);
                  }
              },
              {
                  title: '类型',
                  key: 'type'
              },
              {
                  title: '创建时间',
                  key: 'create'
              },
              {
                title:"操作",
                key: "action",
                render:(h, params) => {

                  return h('div', [
                    h('Button', {
                            props: {
                                type: 'success',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                   window.N.emit(params.row.fullname)
                                }
                            }
                        }, '打开')

                  ])

                }
              }
          ],
          data2: []
      }
  },
  methods:{
    submit(){

      this.loading = true
      var copy_data = window.data
      copy_data = copy_data.filter((item) => {
          if ( item.name.toUpperCase().indexOf(this.value.toUpperCase()) == -1) {
             return false
          }
          return true;
      })

        this.data2 = copy_data
        this.loading = false
      
    }
  },
  mounted(){


    var that = this
     window.ipcRenderer.on('select-reply', function (event, args) {

 

            that.loading = false
               that.data2 = args
             window.data = args 

     


    })

     ipcRenderer.send('select', 'init');
  }

 
}
</script>

<style>
.header-col{
}
.lay-content{
  // position: fixed;
  // top: 64px;
  // z-index:10px;
  // width: 100%;
}
.layout{
  padding-top: 64px;
}
.layout-header{
  position: fixed;
  top:0px;
  width: 100%;
  z-index: 100;
}


</style>
