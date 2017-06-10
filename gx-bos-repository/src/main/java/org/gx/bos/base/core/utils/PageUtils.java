package org.gx.bos.base.core.utils;
import java.util.ArrayList;

import org.macula.core.vo.PageRequestVo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class PageUtils {

	/**
	 * 构造一个空的Page对象
	 * */
	public static <E> Page<E> newEmptyPage(Pageable pageable) {
		return new PageImpl<>(new ArrayList<E>(), pageable, 0);
	}

	/**
	 * 将Pageable对象转换成PageRequestVo <br />
	 * 调用会员中心接口时,分页对象为null时接口会直接返回null
	 * */
	public static PageRequestVo newPageRequestVo(Pageable pageable) {
		Assert.notNull(pageable, "pageable");

		PageRequestVo vo = new PageRequestVo();
		vo.setPageNumber(pageable.getPageNumber());
		vo.setPageSize(pageable.getPageSize());
		if (pageable.getSort() != null) {
			vo.setSort(pageable.getSort().toString());
		}
		return vo;
	}

	/**
	 * 构建 PageRequestVo
	 * */
	public static PageRequestVo newPageRequest(Integer pageNumber, Integer pageSize) {
		PageRequestVo pageRequest = new PageRequestVo();
		pageRequest.setPageNumber(pageNumber);
		pageRequest.setPageSize(pageSize);
		return pageRequest;
	}

	/**
	 * 转换PageRequestVo为SpringData使用的Pageable 
	 * */
	public static Pageable newPageable(PageRequestVo pageRequestVo) {
		if (pageRequestVo == null || pageRequestVo.getPageNumber() == null || pageRequestVo.getPageSize() == null) {
			return null;
		} else {
			return new PageRequest(pageRequestVo.getPageNumber(), pageRequestVo.getPageSize());
		}

	}

	public static <T> String toString(Page<T> page) {
		return "Page [number=" + page.getNumber() + ", numberOfElements=" + page.getNumberOfElements() + ", size=" + page.getSize() + ", totalElements=" + page.getTotalElements() + ", totalPages=" + page.getTotalPages()
				+ ", content=" + page.getContent() + "]";
	}


}
