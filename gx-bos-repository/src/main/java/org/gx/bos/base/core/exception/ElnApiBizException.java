package org.gx.bos.base.core.exception;

import org.macula.exception.MaculaException;

/**
 * 
 * <p>
 * <b>ElnApiBizException</b>自定义业务异常
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
public class ElnApiBizException extends MaculaException {

	private static final long serialVersionUID = 1L;

	public ElnApiBizException(String message) {
		super(message);
	}

	public ElnApiBizException(String message, Throwable cause) {
		super(message, cause);
	}

	public ElnApiBizException(String message, Object... args) {
		super(message, args);
	}

	public ElnApiBizException(String message, Throwable cause, Object... args) {
		super(message, args, cause);
	}

	@Override
	public String getParentCode() {
		return "eln-api";
	}
}
