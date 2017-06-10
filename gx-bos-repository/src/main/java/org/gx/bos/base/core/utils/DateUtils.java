package org.gx.bos.base.core.utils;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 
 * <p>
 * <b>DateUtils</b> 日期处理工具
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
public class DateUtils {

	/**
	 * 系统默认日期格式
	 * */
	public static final String DEFAULT_FORMAT_DATE = "yyyy-MM-dd";

	public static final String DEFAULT_FORMAT_DATE_TIME = "yyyy-MM-dd HH:mm:ss";

	/**
	 * 格式化日期
	 * */
	public static String format(Date date, String pattern) {
		if (date == null)
			return null;
		return new SimpleDateFormat(pattern).format(date);
	}

	/**
	 * 格式化日期
	 * @return (yyyy-MM-dd)
	 * */
	public static String format(Date date) {
		return format(date, DEFAULT_FORMAT_DATE);
	}

	/**
	 * 格式化时间
	 * */
	public static String formatDatetime(Date date) {
		return format(date, DEFAULT_FORMAT_DATE_TIME);
	}

	/**
	 * 根据指定格式将字符串转化成Date
	 * */
	public static Date parse(String dateStr, String pattern) throws ParseException {
		return new SimpleDateFormat(pattern).parse(dateStr);
	}

	/**
	 * 按系统默认时间格式(yyyy-MM-dd HH:mm:ss),将字符串转换成Date
	 * 
	 * */
	public static Date parse(String datetimeStr) throws ParseException {
		return parse(datetimeStr, DEFAULT_FORMAT_DATE_TIME);
	}

	/**
	 * 导入导出文件时，文件名添加时间串格式
	 */
	public static final String FORMAT_FILENAME_DATETIME_PATTERN = "yyyyMMddHHmmss";

	/**
	 * 获取当前时间字符串
	 * */
	public static String getCurrentDateTimeSuffix() {
		return new SimpleDateFormat(FORMAT_FILENAME_DATETIME_PATTERN).format(new Date());
	}

	public static Date getEndDate(Date date) {

		Date returnDate = null;
		try {
			String end = format(date, "yyyy-MM-dd");
			returnDate = parse(end + " 23:59:59", "yyyy-MM-dd HH:mm:ss");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return returnDate;
	}

	public static Date getStartDate(Date date) {

		Date returnDate = null;
		try {
			String end = format(date, "yyyy-MM-dd");
			returnDate = parse(end + " 00:00:00", "yyyy-MM-dd HH:mm:ss");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return returnDate;
	}

	public static Date addDays(final Date date, final int amount) {
		return add(date, Calendar.DAY_OF_MONTH, amount);
	}

	private static Date add(final Date date, final int calendarField, final int amount) {
		if (date == null) {
			throw new IllegalArgumentException("The date must not be null");
		}
		final Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(calendarField, amount);
		return c.getTime();
	}

	/**
	 * 获取给定日期所在星期的开始时间(星期一)
	 * java默认周日为第一天
	 * */
	public static Date getFirstDayOfWeek(Date d) {

		Calendar c = Calendar.getInstance();
		c.setTime(d);
		if (Calendar.SUNDAY == c.get(Calendar.DAY_OF_WEEK)) {
			c.add(Calendar.DAY_OF_YEAR, -6);
		} else {
			c.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		}
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return c.getTime();
	}

	/**
	 * 获取每个月的第一天
	 * */
	public static Date getFirstDayOfMonth(Date d) {

		Calendar c = Calendar.getInstance();
		c.setTime(d);
		int year = c.get(Calendar.YEAR);
		int month = c.get(Calendar.MONTH);
		c.set(year, month, 1, 0, 0, 0);
		return c.getTime();
	}

	/**
	 * 获取年的第一天
	 * */
	public static Date getFirstDayOfYear(Date d) {
		Calendar c = Calendar.getInstance();
		c.setTime(d);
		int year = c.get(Calendar.YEAR);
		c.set(year, 1, 1, 0, 0, 0);
		return c.getTime();
	}


	/***
	 *
	 * @param date
	 * @param dateFormat : e.g:yyyy-MM-dd HH:mm:ss
	 * @return
	 */
	public static String formatDateByPattern(Date date,String dateFormat){
		SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
		String formatTimeStr = null;
		if (date != null) {
			formatTimeStr = sdf.format(date);
		}
		return formatTimeStr;
	}

	/***
	 * convert Date to cron ,eg.  "24 53 09 10 01 ? 2017"
	 * @param date  : 时间点
	 * @return
	 */
	public static String getCron(Date  date){
		String dateFormat = "ss mm HH dd MM ? yyyy";
		return formatDateByPattern(date, dateFormat);
	}

}
