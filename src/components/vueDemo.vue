<template>
  <div class="components-container">
    <split-pane v-on:resize="resize"
      :default-percent='75'
      split="horizontal">
      <template slot="paneL">
        <split-pane split="vertical"
          :default-percent='70'>

          <template slot="paneL">
            <div class="p20 paragraph-show"
              v-html="resultParagraph">
            </div>
          </template>
          <template slot="paneR">
            <el-tree :data="selectData"
              :check-on-click-node="true"
              ref="keysTree"
              show-checkbox
              node-key="id"
              class="p20"
              @check-change="selectKeys"
              :props="defaultProps">
            </el-tree>
          </template>
        </split-pane>
      </template>

      <template slot="paneL">
        <el-table class="table-data"
          :data="tableData"
          style="width: 100%">
          <el-table-column prop="start"
            label="Start"
            width="180">
          </el-table-column>
          <el-table-column prop="end"
            label="End"
            width="180">
          </el-table-column>
          <el-table-column prop="type"
            label="Semantic">
          </el-table-column>
        </el-table>
      </template>

    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'
import { getKeyWords } from '@/utils/api'
export default {
  name: 'vueDemo',
  components: {
    splitPane
  },
  props: {
    msg: String
  },
  data () {
    return {
      paragraph: 'Koa is a new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs. By leveraging async functions, Koa allows you to ditch callbacks and greatly increase error-handling. Koa does not bundle any middleware within its core, and it provides an elegant suite of methods that make writing servers fast and enjoyable.',
      resultParagraph: '',
      selectData: [],
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      keywordsData: []
    }
  },
  mounted () {
    this.resultParagraph = this.paragraph
    this.getTreeData()
  },
  methods: {
    resize () {
      console.log('resize')
    },
    getTreeData () {
      getKeyWords().then((result) => {
        let keyResult = result.data.data
        this.selectData = keyResult

      }).catch(() => { })
    },
    selectKeys () {
      let treeData = this.$refs.keysTree.getCheckedNodes(true);
      this.tableData = []
      treeData.map(item => {
        item.data.forEach(element => {
          this.keywordsData.push(element)
        });


      });
      this.brightenKeyword(this.paragraph)
    },
    brightenKeyword (paragraphShow) {

      this.keywordsData.map((item) => {
        let paragraphInfo = {
          start: paragraphShow.indexOf(item.keyword),
          end: paragraphShow.indexOf(item.keyword) + item.keyword.length - 1,
          type: item.type
        }
        this.tableData.push(paragraphInfo)
        if (item.type == 'problem') {
          paragraphShow = paragraphShow.replace(item.keyword, '<font class="paragraph-problem">' + item.keyword + '</font>')
        }
        if (item.type == 'treatment') {
          paragraphShow = paragraphShow.replace(item.keyword, '<font class="paragraph-treatment">' + item.keyword + '</font>')
        }
        if (item.type == 'Relation') {
          paragraphShow = paragraphShow.replace(item.keyword, '<font class="paragraph-relation">' + item.keyword + '</font>')
        }
      })
      this.keywordsData = []
      this.resultParagraph = paragraphShow

    }
  }


}
</script>

<style lang="stylus">
$problem-color = #25c2ca
$relation-color = #409EFF
$treatment-color = #F56C6C
.components-container
  position relative
  height 100vh
.paragraph-show
  line-height 3.4em
.table-data
  padding 3px 20px
.paragraph-problem
  color $problem-color
  position relative
  white-space nowrap
  text-decoration underline
  &:before
    content 'problem'
    color #ffffff
    position absolute
    top -25px
    font-size 12px
    background $problem-color
    height 20px
    line-height 20px
    padding 0 10px
    border-radius 35px
    left 40%
  &:after
    content ''
    position absolute
    left 44%
    top -6px
    width 0
    height 0
    border-left 5px solid transparent
    border-right 5px solid transparent
    border-top 6px solid $problem-color
.paragraph-relation
  color $relation-color
  position relative
  white-space nowrap
  text-decoration underline
  &:before
    content 'relation'
    color #ffffff
    position absolute
    top -25px
    font-size 12px
    background $relation-color
    height 20px
    line-height 20px
    padding 0 10px
    border-radius 35px
    left 40%
  &:after
    content ''
    position absolute
    left 44%
    top -6px
    width 0
    height 0
    border-left 5px solid transparent
    border-right 5px solid transparent
    border-top 6px solid $relation-color
.paragraph-treatment
  color $treatment-color
  position relative
  white-space nowrap
  text-decoration underline
  &:before
    content 'treatment'
    color #ffffff
    position absolute
    top -25px
    font-size 12px
    background $treatment-color
    height 20px
    line-height 20px
    padding 0 10px
    border-radius 35px
    left 40%
  &:after
    content ''
    position absolute
    left 44%
    top -6px
    width 0
    height 0
    border-left 5px solid transparent
    border-right 5px solid transparent
    border-top 6px solid $treatment-color
</style>
