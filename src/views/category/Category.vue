<template>
  <div class="wrapper">
    <div class="content">
      <ul>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>110</li>
        <li>111</li>
        <li>112</li>
        <li>113</li>
        <li>114</li>
        <li>115</li>
        <li>116</li>
        <li>117</li>
        <li>118</li>
        <li>119</li>
        <li>120</li>
        <li>121</li>
        <li>122</li>
        <li>123</li>
        <li>124</li>
        <li>125</li>
        <li>126</li>
        <li>127</li>
        <li>128</li>
        <li>129</li>
        <li>130</li>
        <li>131</li>
        <li>132</li>
        <li>133</li>
        <li>134</li>
        <li>135</li>
        <li>136</li>
        <li>137</li>
        <li>138</li>
        <li>139</li>
        <li>140</li>
        <li>141</li>
        <li>142</li>
        <li>143</li>
        <li>144</li>
        <li>145</li>
        <li>146</li>
        <li>147</li>
        <li>148</li>
        <li>149</li>
        <li>150</li>
        <li>151</li>
        <li>152</li>
        <li>153</li>
        <li>154</li>
        <li>155</li>
        <li>156</li>
        <li>157</li>
        <li>158</li>
        <li>159</li>
        <li>160</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Category',
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector('.wrapper'), {
      probeType: 3,
      pullUpLoad:true
    })
    this.scroll.on('scroll', (position) => {
      console.log(position)
    });
    this.scroll.on('pulling', () => {
      // 上拉加载更多
    })
  }
}
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;
    overflow: hidden;
    /* css scroll效果 */
    /*overflow: hidden;
    overflow-y: auto; */
  }
</style>
