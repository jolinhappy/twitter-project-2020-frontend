import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  }
}

export const formDateFilter = {
  filters: {
    formateDate(dataTime) {
      const date = new Date(dataTime);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return year + "年" + month + "月" + day + "日";
    }
  }
}

export const formDateNoYearFilter = {
  filters: {
    formateDate(dataTime) {
      const date = new Date(dataTime);
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return month + "月" + day + "日";
    }
  }
}

export const formDateToTimeFilter = {
  filters: {
    formateDateToTime(value) {
      const date = new Date(value);
      const hour = date.getHours();
      const afterhour = hour - 12;
      const minute = date.getMinutes();
      return hour > 12
        ? "下午" + afterhour + ":" + minute
        : "上午" + hour + ":" + minute;
    }
  }
}



export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://i.imgur.com/qRezTy6.pnge'
    }
  }
}